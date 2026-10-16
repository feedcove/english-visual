#!/usr/bin/env python3
"""Свой текст → CoNLL-U для экрана «Мои предложения» (вставить вывод в приложение).

Нужен spaCy и модели (один раз, около 30 МБ):
    python3 -m pip install spacy
    python3 -m spacy download ru_core_news_sm
    python3 -m spacy download en_core_web_sm

Запуск:
    python3 tools/parse.py --lang ru "Мама мыла раму. Кошка спала на окне."
    python3 tools/parse.py --lang en < my-text.txt | pbcopy

Разбор автоматический: для простых предложений он обычно верен, в придаточных и предлогах ошибается.
Без установки то же самое делает веб-сервис UDPipe: https://lindat.mff.cuni.cz/services/udpipe/
"""

import argparse
import sys

MODELS = {"ru": "ru_core_news_sm", "en": "en_core_web_sm"}


def to_conllu(doc) -> str:
    out = []
    for sent in doc.sents:
        toks = [t for t in sent if not t.is_space]
        idx = {t.i: n for n, t in enumerate(toks, start=1)}
        head = {t.i: (0 if t.head == t else idx.get(t.head.i, 0)) for t in toks}
        # spaCy для английского даёт метки OntoNotes (nsubj, dobj, prep, pobj…); приводим основные к UD.
        dep = {t.i: UD.get(t.dep_, t.dep_) for t in toks}
        # В OntoNotes существительное висит на предлоге (prep → pobj), в UD наоборот: предлог — case при существительном.
        for t in toks:
            if t.dep_ == "pobj" and t.head.dep_ in ("prep", "agent", "dative"):
                prep = t.head
                grand = prep.head
                head[t.i] = 0 if grand == prep else idx.get(grand.i, 0)
                dep[t.i] = "nmod" if grand.pos_ in ("NOUN", "PROPN", "PRON") else "obl"
                head[prep.i] = idx[t.i]
                dep[prep.i] = "case"
        out.append(f"# text = {' '.join(sent.text.split())}")
        for t in toks:
            # Перенос строки spaCy выносит в отдельный пробельный токен: тогда после слова всё равно пробел.
            spaced = t.whitespace_ or (t.i + 1 < len(t.doc) and t.doc[t.i + 1].is_space)
            misc = "_" if spaced else "SpaceAfter=No"
            out.append("\t".join([str(idx[t.i]), t.text, t.lemma_ or "_", t.pos_ or "X", t.tag_ or "_", "_", str(head[t.i]), dep[t.i], "_", misc]))
        out.append("")
    return "\n".join(out)


UD = {
    "ROOT": "root",
    "dobj": "obj",
    "pobj": "obl",
    "prep": "case",
    "poss": "nmod:poss",
    "attr": "compl",
    "acomp": "compl",
    "neg": "advmod",
    "npadvmod": "obl",
    "relcl": "acl",
    "dative": "iobj",
    "agent": "obl",
    "auxpass": "aux",
    "nsubjpass": "nsubj",
    "csubjpass": "csubj",
    "quantmod": "advmod",
    "preconj": "cc",
    "predet": "det",
    "prt": "compound",
    "pcomp": "obj",
    "oprd": "obj",
}


def main() -> None:
    parser = argparse.ArgumentParser(description=__doc__, formatter_class=argparse.RawDescriptionHelpFormatter)
    parser.add_argument("--lang", choices=MODELS, default="ru")
    parser.add_argument("text", nargs="*", help="текст; без аргументов читается из stdin")
    args = parser.parse_args()
    try:
        import spacy
    except ImportError:
        sys.exit("Нет spaCy: python3 -m pip install spacy, затем python3 -m spacy download " + MODELS[args.lang])
    nlp = spacy.load(MODELS[args.lang])
    text = " ".join(args.text) if args.text else sys.stdin.read()
    sys.stdout.write(to_conllu(nlp(text)))


if __name__ == "__main__":
    main()
