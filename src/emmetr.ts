import parse from "@emmetio/abbreviation"
import { AbbreviationNode } from "@emmetio/abbreviation"
import resolveImplicitName from "@emmetio/implicit-tag"

const abbreviationMap: { [name: string]: string } = {
    acr: "acronym",
    adr: "address",
    art: "article",
    bq: "blockquote",
    btn: "button",
    cap: "caption",
    cmd: "command",
    colg: "colgroup",
    datag: "datagrid",
    datal: "datalist",
    det: "details",
    dlg: "dialog",
    emb: "embed",
    fig: "figure",
    figc: "figcaption",
    fst: "fieldset",
    fset: "fieldset",
    ftr: "footer",
    hdr: "header",
    ifr: "iframe",
    kg: "keygen",
    mn: "main",
    leg: "legend",
    obj: "object",
    opt: "option",
    optg: "optgroup",
    out: "output",
    pic: "picture",
    prog: "progress",
    sect: "section",
    src: "source",
    str: "strong",
    tarea: "textarea",
    tem: "template"
};

function parseAbbreviationNodeName(nodeName: string | undefined, parentName: string): string {
    if (nodeName == undefined) {
        nodeName = resolveImplicitName(parentName)
    }

    return abbreviationMap[nodeName] || nodeName;
}

function createElementFromAbbreviationNode(parentName = "") {
    return (node: AbbreviationNode) => {
        const tag = parseAbbreviationNodeName(node.name, parentName);
        const element = document.createElement(tag);

        node.attributes?.forEach(attribute => {
            if (attribute.name) {
                if (attribute.boolean || !attribute.value) {
                    element.setAttribute(attribute.name, "");
                }
                else {
                    const attributeValue = attribute.value.toString();

                    if (attribute.name == "id") {
                        element.id = attributeValue;
                    }
                    else if (attribute.name == "class") {
                        element.classList.add(attributeValue);
                    }
                    else {
                        element.setAttribute(attribute.name, attributeValue);
                    }
                }
            }
        });

        if (node.value) {
            element.textContent = node.value.toString();
        }

        const children = node.children.map(createElementFromAbbreviationNode(tag))
        children.forEach(child => element.append(child));

        return element;
    }
}

export default function emmetr(emmet: string) {
    const result: HTMLElement[] = [];

    const tree = parse(emmet);

    const children = tree.children.map(createElementFromAbbreviationNode());

    children.forEach(element => {
        result.push(element);
    });

    return result;
}
