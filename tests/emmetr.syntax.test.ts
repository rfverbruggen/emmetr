import emmetr from "../src/emmetr";

test("Emmetr empty emmet string returns empty array HTMLElement", () => {
    const actual = emmetr("");

    expect(actual.length).toBe(0);
});

test("child: >", () => {
    const actual = emmetr("nav>ul>li");

    expect(actual.length).toBe(1);

    const navElement = actual[0];
    expect(navElement).toBeInstanceOf(HTMLElement);
    expect(navElement.tagName).toBe("NAV");
    expect(navElement.children.length).toBe(1);
    
    const ulElement = navElement.children[0]
    expect(ulElement).toBeInstanceOf(HTMLUListElement);
    expect(ulElement.children.length).toBe(1);

    const liElement = ulElement.children[0];
    expect(liElement).toBeInstanceOf(HTMLLIElement);
});

test("sibling: +", () => {
    const actual = emmetr("div+p+bq");

    expect(actual.length).toBe(3);
    expect(actual[0]).toBeInstanceOf(HTMLDivElement);
    expect(actual[1]).toBeInstanceOf(HTMLParagraphElement);
    expect(actual[2]).toBeInstanceOf(HTMLElement);
    expect(actual[2].tagName).toBe("BLOCKQUOTE");
});

test("climb up: ^ (single)", () => {
    const actual = emmetr("div+div>p>span+em^bq");

    expect(actual.length).toBe(2);
    expect(actual[0]).toBeInstanceOf(HTMLDivElement);
    expect(actual[1]).toBeInstanceOf(HTMLDivElement);
    expect(actual[1].children.length).toBe(2);
    expect(actual[1].children[0]).toBeInstanceOf(HTMLParagraphElement);
    expect(actual[1].children[0].children.length).toBe(2);
    expect(actual[1].children[0].children[0]).toBeInstanceOf(HTMLSpanElement);
    expect(actual[1].children[0].children[1]).toBeInstanceOf(HTMLElement);
    expect(actual[1].children[0].children[1].tagName).toBe("EM");
    expect(actual[1].children[1]).toBeInstanceOf(HTMLElement);
    expect(actual[1].children[1].tagName).toBe("BLOCKQUOTE");
});

test("climb up: ^ (twice)", () => {
    const actual = emmetr("div+div>p>span+em^^bq");

    expect(actual.length).toBe(3);
    
    expect(actual[0]).toBeInstanceOf(HTMLDivElement);
    expect(actual[1]).toBeInstanceOf(HTMLDivElement);
    expect(actual[1].children.length).toBe(1);
    expect(actual[1].children[0]).toBeInstanceOf(HTMLParagraphElement);
    expect(actual[1].children[0].children.length).toBe(2);
    expect(actual[1].children[0].children[0]).toBeInstanceOf(HTMLSpanElement);
    expect(actual[1].children[0].children[1]).toBeInstanceOf(HTMLElement);
    expect(actual[1].children[0].children[1].tagName).toBe("EM");
    expect(actual[2]).toBeInstanceOf(HTMLElement);
    expect(actual[2].tagName).toBe("BLOCKQUOTE");
});

test("Grouping: ()", () => {
    const actual = emmetr("div>(header>ul>li*2>a)+footer>p");

    expect(actual.length).toBe(1);
    
    const divElement = actual[0];
    expect(divElement).toBeInstanceOf(HTMLDivElement);
    expect(divElement.children.length).toBe(2);

    const headerElement = divElement.children[0];
    expect(headerElement).toBeInstanceOf(HTMLElement);
    expect(headerElement.tagName).toBe("HEADER");
    expect(headerElement.children.length).toBe(1);

    const ulElement = headerElement.children[0];
    expect(ulElement).toBeInstanceOf(HTMLUListElement);
    expect(ulElement.children.length).toBe(2);

    const firstLiElement = ulElement.children[0];
    expect(firstLiElement).toBeInstanceOf(HTMLLIElement);
    expect(firstLiElement.children.length).toBe(1);

    
    expect(firstLiElement.children[0]).toBeInstanceOf(HTMLAnchorElement);
    const firstAnchorElement = firstLiElement.children[0] as HTMLAnchorElement;
    expect(firstAnchorElement.href).toBe("");

    const secondLiElement = ulElement.children[1];
    expect(secondLiElement).toBeInstanceOf(HTMLLIElement);
    expect(secondLiElement.children.length).toBe(1);

    
    expect(secondLiElement.children[0]).toBeInstanceOf(HTMLAnchorElement);
    const secondAnchorElement = secondLiElement.children[0] as HTMLAnchorElement;
    expect(secondAnchorElement.href).toBe("");

    const footerElement = divElement.children[1];
    expect(footerElement).toBeInstanceOf(HTMLElement);
    expect(footerElement.tagName).toBe("FOOTER");
    expect(footerElement.children.length).toBe(1);
    expect(footerElement.children[0]).toBeInstanceOf(HTMLParagraphElement);
});

test("Grouping: () (nested)", () => {
    const actual = emmetr("(div>dl>(dt+dd)*3)+footer>p");

    expect(actual.length).toBe(2);
    
    const divElement = actual[0];
    expect(divElement).toBeInstanceOf(HTMLDivElement);
    expect(divElement.children.length).toBe(1);

    const dlElement = divElement.children[0];
    expect(dlElement).toBeInstanceOf(HTMLDListElement);
    expect(dlElement.children.length).toBe(6);

    const firstDtElement = dlElement.children[0];
    expect(firstDtElement).toBeInstanceOf(HTMLElement);
    expect(firstDtElement.tagName).toBe("DT");

    const firstDdElement = dlElement.children[1];
    expect(firstDdElement).toBeInstanceOf(HTMLElement);
    expect(firstDdElement.tagName).toBe("DD");

    const secondDtElement = dlElement.children[2];
    expect(secondDtElement).toBeInstanceOf(HTMLElement);
    expect(secondDtElement.tagName).toBe("DT");

    const secondDdElement = dlElement.children[3];
    expect(secondDdElement).toBeInstanceOf(HTMLElement);
    expect(secondDdElement.tagName).toBe("DD");

    const thirdDtElement = dlElement.children[4];
    expect(thirdDtElement).toBeInstanceOf(HTMLElement);
    expect(thirdDtElement.tagName).toBe("DT");

    const thirdDdElement = dlElement.children[5];
    expect(thirdDdElement).toBeInstanceOf(HTMLElement);
    expect(thirdDdElement.tagName).toBe("DD");

    const footerElement = actual[1];
    expect(footerElement).toBeInstanceOf(HTMLElement);
    expect(footerElement.tagName).toBe("FOOTER");
    expect(footerElement.children.length).toBe(1);
    expect(footerElement.children[0]).toBeInstanceOf(HTMLParagraphElement);
});

test("Multiplication: *", () => {
    const actual = emmetr("ul>li*5");

    expect(actual.length).toBe(1);
    expect(actual[0]).toBeInstanceOf(HTMLUListElement);
    expect(actual[0].children.length).toBe(5);

    expect(actual[0].children[0]).toBeInstanceOf(HTMLLIElement);
    expect(actual[0].children[1]).toBeInstanceOf(HTMLLIElement);
    expect(actual[0].children[2]).toBeInstanceOf(HTMLLIElement);
    expect(actual[0].children[3]).toBeInstanceOf(HTMLLIElement);
    expect(actual[0].children[4]).toBeInstanceOf(HTMLLIElement);
});

test("Naming and numbering: $", () => {
    const actual = emmetr("ul>li.sample$*5");

    expect(actual.length).toBe(1);
    expect(actual[0]).toBeInstanceOf(HTMLUListElement);
    expect(actual[0].children.length).toBe(5);

    expect(actual[0].children[0]).toBeInstanceOf(HTMLLIElement);
    expect(actual[0].children[0].classList.length).toBe(1);
    expect(actual[0].children[0].classList[0]).toBe("sample1");
    expect(actual[0].children[1]).toBeInstanceOf(HTMLLIElement);
    expect(actual[0].children[1].classList.length).toBe(1);
    expect(actual[0].children[1].classList[0]).toBe("sample2");
    expect(actual[0].children[2]).toBeInstanceOf(HTMLLIElement);
    expect(actual[0].children[2].classList.length).toBe(1);
    expect(actual[0].children[2].classList[0]).toBe("sample3");
    expect(actual[0].children[3]).toBeInstanceOf(HTMLLIElement);
    expect(actual[0].children[3].classList.length).toBe(1);
    expect(actual[0].children[3].classList[0]).toBe("sample4");
    expect(actual[0].children[4]).toBeInstanceOf(HTMLLIElement);
    expect(actual[0].children[4].classList.length).toBe(1);
    expect(actual[0].children[4].classList[0]).toBe("sample5");
});

test("Naming and numbering: $ (multiple)", () => {
    const actual = emmetr("h$[title=topic$]{Headline $}*3");

    expect(actual.length).toBe(3);

    expect(actual[0]).toBeInstanceOf(HTMLHeadingElement);
    expect(actual[0].tagName).toBe("H1");
    expect(actual[0].textContent).toBe("Headline 1");
    expect(actual[0].attributes.length).toBe(1);
    expect(actual[0].attributes[0].value).toBe("topic1");

    expect(actual[1]).toBeInstanceOf(HTMLHeadingElement);
    expect(actual[1].tagName).toBe("H2");
    expect(actual[1].textContent).toBe("Headline 2");
    expect(actual[1].attributes.length).toBe(1);
    expect(actual[1].attributes[0].value).toBe("topic2");

    expect(actual[2]).toBeInstanceOf(HTMLHeadingElement);
    expect(actual[2].tagName).toBe("H3");
    expect(actual[2].textContent).toBe("Headline 3");
    expect(actual[2].attributes.length).toBe(1);
    expect(actual[2].attributes[0].value).toBe("topic3");
});

test("Naming and numbering: $ (prefix numbers)", () => {
    const actual = emmetr("ul>li.item$$$*5");

    expect(actual.length).toBe(1);
    expect(actual[0]).toBeInstanceOf(HTMLUListElement);
    expect(actual[0].children.length).toBe(5);

    expect(actual[0].children[0]).toBeInstanceOf(HTMLLIElement);
    expect(actual[0].children[0].classList.length).toBe(1);
    expect(actual[0].children[0].classList[0]).toBe("item001");
    expect(actual[0].children[1]).toBeInstanceOf(HTMLLIElement);
    expect(actual[0].children[1].classList.length).toBe(1);
    expect(actual[0].children[1].classList[0]).toBe("item002");
    expect(actual[0].children[2]).toBeInstanceOf(HTMLLIElement);
    expect(actual[0].children[2].classList.length).toBe(1);
    expect(actual[0].children[2].classList[0]).toBe("item003");
    expect(actual[0].children[3]).toBeInstanceOf(HTMLLIElement);
    expect(actual[0].children[3].classList.length).toBe(1);
    expect(actual[0].children[3].classList[0]).toBe("item004");
    expect(actual[0].children[4]).toBeInstanceOf(HTMLLIElement);
    expect(actual[0].children[4].classList.length).toBe(1);
    expect(actual[0].children[4].classList[0]).toBe("item005");
});

test("Naming and numbering: $ (reverse order)", () => {
    const actual = emmetr("ul>li.item$@-*5");

    expect(actual.length).toBe(1);
    expect(actual[0]).toBeInstanceOf(HTMLUListElement);
    expect(actual[0].children.length).toBe(5);

    expect(actual[0].children[0]).toBeInstanceOf(HTMLLIElement);
    expect(actual[0].children[0].classList.length).toBe(1);
    expect(actual[0].children[0].classList[0]).toBe("item5");
    expect(actual[0].children[1]).toBeInstanceOf(HTMLLIElement);
    expect(actual[0].children[1].classList.length).toBe(1);
    expect(actual[0].children[1].classList[0]).toBe("item4");
    expect(actual[0].children[2]).toBeInstanceOf(HTMLLIElement);
    expect(actual[0].children[2].classList.length).toBe(1);
    expect(actual[0].children[2].classList[0]).toBe("item3");
    expect(actual[0].children[3]).toBeInstanceOf(HTMLLIElement);
    expect(actual[0].children[3].classList.length).toBe(1);
    expect(actual[0].children[3].classList[0]).toBe("item2");
    expect(actual[0].children[4]).toBeInstanceOf(HTMLLIElement);
    expect(actual[0].children[4].classList.length).toBe(1);
    expect(actual[0].children[4].classList[0]).toBe("item1");
});

test("Naming and numbering: $ (specific start number)", () => {
    const actual = emmetr("ul>li.item$@3*5");

    expect(actual.length).toBe(1);
    expect(actual[0]).toBeInstanceOf(HTMLUListElement);
    expect(actual[0].children.length).toBe(5);

    expect(actual[0].children[0]).toBeInstanceOf(HTMLLIElement);
    expect(actual[0].children[0].classList.length).toBe(1);
    expect(actual[0].children[0].classList[0]).toBe("item3");
    expect(actual[0].children[1]).toBeInstanceOf(HTMLLIElement);
    expect(actual[0].children[1].classList.length).toBe(1);
    expect(actual[0].children[1].classList[0]).toBe("item4");
    expect(actual[0].children[2]).toBeInstanceOf(HTMLLIElement);
    expect(actual[0].children[2].classList.length).toBe(1);
    expect(actual[0].children[2].classList[0]).toBe("item5");
    expect(actual[0].children[3]).toBeInstanceOf(HTMLLIElement);
    expect(actual[0].children[3].classList.length).toBe(1);
    expect(actual[0].children[3].classList[0]).toBe("item6");
    expect(actual[0].children[4]).toBeInstanceOf(HTMLLIElement);
    expect(actual[0].children[4].classList.length).toBe(1);
    expect(actual[0].children[4].classList[0]).toBe("item7");
});

test("ID and CLASS attributes: ID", () => {
    const actual = emmetr("#header");

    expect(actual.length).toBe(1);
    expect(actual[0]).toBeInstanceOf(HTMLDivElement);
    expect(actual[0].id).toBe("header");
});

test("ID and CLASS attributes: CLASS", () => {
    const actual = emmetr(".title");

    expect(actual.length).toBe(1);
    expect(actual[0]).toBeInstanceOf(HTMLDivElement);
    expect(actual[0].classList.length).toBe(1);
    expect(actual[0].classList[0]).toBe("title");
});

test("ID and CLASS attributes: ID and CLASS", () => {
    const actual = emmetr("form#search.wide");

    expect(actual.length).toBe(1);
    expect(actual[0]).toBeInstanceOf(HTMLFormElement);
    expect(actual[0].id).toBe("search");
    expect(actual[0].classList.length).toBe(1);
    expect(actual[0].classList[0]).toBe("wide");
});

test("ID and CLASS attributes: multiple CLASS", () => {
    const actual = emmetr("p.class1.class2.class3");

    expect(actual.length).toBe(1);
    expect(actual[0]).toBeInstanceOf(HTMLParagraphElement);
    expect(actual[0].classList.length).toBe(3);
    expect(actual[0].classList[0]).toBe("class1");
    expect(actual[0].classList[1]).toBe("class2");
    expect(actual[0].classList[2]).toBe("class3");
});

test("Custom attributes: (single)", () => {
    const actual = emmetr("p[title=\"Hello world\"]");

    expect(actual.length).toBe(1);
    expect(actual[0]).toBeInstanceOf(HTMLParagraphElement);
    expect(actual[0].attributes.length).toBe(1);
    expect(actual[0].attributes[0].value).toBe("Hello world");
});

test("Custom attributes: (multiple)", () => {
    const actual = emmetr("td[rowspan=2 colspan=3 title]");

    expect(actual.length).toBe(1);
    expect(actual[0]).toBeInstanceOf(HTMLTableCellElement);
    expect(actual[0].attributes.length).toBe(3);
    expect(actual[0].attributes[0].value).toBe("2");
    expect(actual[0].attributes[1].value).toBe("3");
    expect(actual[0].attributes[2].value).toBe("");

});

test("Custom attributes: (single quote)", () => {
    const actual = emmetr("[a='value1' b=\"value2\"]");

    expect(actual.length).toBe(1);
    expect(actual[0]).toBeInstanceOf(HTMLDivElement);
    expect(actual[0].attributes.length).toBe(2);
    expect(actual[0].attributes[0].value).toBe("value1");
    expect(actual[0].attributes[1].value).toBe("value2");
});

test("Text: {} (single)", () => {
    const actual = emmetr("a{Click me}");

    expect(actual.length).toBe(1);
    expect(actual[0]).toBeInstanceOf(HTMLAnchorElement);
    const anchor = actual[0] as HTMLAnchorElement;
    expect(anchor.href).toBe("");
    expect(anchor.textContent).toBe("Click me");
});

test("Text: {} (multiple)", () => {
    const actual = emmetr("p>{Click }+a{here}+{ to continue}");

    expect(actual.length).toBe(1);
    expect(actual[0]).toBeInstanceOf(HTMLParagraphElement);
    expect(actual[0].children.length).toBe(3);

    expect(actual[0].children[0]).toBeInstanceOf(HTMLSpanElement);
    expect(actual[0].children[0].textContent).toBe("Click ");

    expect(actual[0].children[1]).toBeInstanceOf(HTMLAnchorElement);
    const anchor = actual[0].children[1] as HTMLAnchorElement;
    expect(anchor.href).toBe("");
    expect(anchor.textContent).toBe("here");

    expect(actual[0].children[2]).toBeInstanceOf(HTMLSpanElement);
    expect(actual[0].children[2].textContent).toBe(" to continue");
});

test("Implicit tag names (div)", () => {
    const actual = emmetr(".class");

    expect(actual.length).toBe(1);
    expect(actual[0]).toBeInstanceOf(HTMLDivElement);
    expect(actual[0].classList.length).toBe(1);
    expect(actual[0].classList[0]).toBe("class");
});

test("Implicit tag names (em>span)", () => {
    const actual = emmetr("em>.class");

    expect(actual.length).toBe(1);
    expect(actual[0]).toBeInstanceOf(HTMLElement);
    expect(actual[0].tagName).toBe("EM");
    expect(actual[0].children.length).toBe(1);

    expect(actual[0].children[0]).toBeInstanceOf(HTMLSpanElement);
    expect(actual[0].children[0].classList.length).toBe(1);
    expect(actual[0].children[0].classList[0]).toBe("class");
});

test("Implicit tag names (ul>.class)", () => {
    const actual = emmetr("ul>.class");

    expect(actual.length).toBe(1);
    expect(actual[0]).toBeInstanceOf(HTMLUListElement);
    expect(actual[0].children.length).toBe(1);

    expect(actual[0].children[0]).toBeInstanceOf(HTMLLIElement);
    expect(actual[0].children[0].classList.length).toBe(1);
    expect(actual[0].children[0].classList[0]).toBe("class");
});

test("Implicit tag names (table>.row>.col)", () => {
    const actual = emmetr("table>.row>.col");

    expect(actual.length).toBe(1);
    expect(actual[0]).toBeInstanceOf(HTMLTableElement);
    expect(actual[0].children.length).toBe(1);

    expect(actual[0].children[0]).toBeInstanceOf(HTMLTableRowElement);
    expect(actual[0].children[0].children.length).toBe(1);
    expect(actual[0].children[0].classList.length).toBe(1);
    expect(actual[0].children[0].classList[0]).toBe("row");

    expect(actual[0].children[0].children[0]).toBeInstanceOf(HTMLTableCellElement);
    expect(actual[0].children[0].children[0].classList.length).toBe(1);
    expect(actual[0].children[0].children[0].classList[0]).toBe("col");
});
