class Element extends EventTarget {
  constructor(tagName = 'div') {
    super();
    this.tagName = tagName.toLowerCase();
    this.nodeName = tagName.toUpperCase();
    this.className = '';
    this.children = [];
    this.parentNode = null;
  }
  appendChild(node) {
    node.parentNode = this;
    this.children.push(node);
  }
  insertBefore(node, ref) {
    node.parentNode = this;
    const idx = this.children.indexOf(ref);
    if (idx === -1) this.children.push(node); else this.children.splice(idx, 0, node);
  }
  get previousSibling() {
    if (!this.parentNode) return null;
    const idx = this.parentNode.children.indexOf(this);
    return idx > 0 ? this.parentNode.children[idx - 1] : null;
  }
  get innerHTML() {
    return this.children.map(c => c.outerHTML).join('');
  }
  set innerHTML(html) {
    this.children = [];
    if (html) {
      const child = new Element();
      child._rawOuterHTML = html;
      this.appendChild(child);
    }
  }
  get outerHTML() {
    if (this._rawOuterHTML) {
      const closing = `</${this.tagName}>`;
      const idx = this._rawOuterHTML.indexOf(closing);
      if (idx !== -1) {
        return this._rawOuterHTML.slice(0, idx) + this.innerHTML + this._rawOuterHTML.slice(idx);
      }
      return this._rawOuterHTML;
    }
    const cls = this.className ? ` class="${this.className}"` : '';
    return `<${this.tagName}${cls}>${this.innerHTML}</${this.tagName}>`;
  }
  set outerHTML(html) {
    this._rawOuterHTML = html;
    const m = html.match(/^<([a-zA-Z0-9-]+)([^>]*)>/);
    if (m) {
      this.tagName = m[1].toLowerCase();
      const cls = m[2].match(/class="([^"]*)"/);
      if (cls) this.className = cls[1];
    }
  }
}

class Document {
  constructor() {
    this.body = new Element('body');
    this.documentElement = { clientWidth: 1024, clientHeight: 768 };
    this.readyState = 'complete';
  }
  createElement(tag) { return new Element(tag); }
  createEvent() {
    class CustomEvt extends Event {
      constructor () {
        super('temp', { bubbles: true, cancelable: true })
      }
      initCustomEvent (name, bubbles, cancelable, detail) {
        Object.defineProperty(this, 'type', { value: name })
        Object.defineProperty(this, 'bubbles', { value: bubbles })
        Object.defineProperty(this, 'cancelable', { value: cancelable })
        this.detail = detail
      }
    }
    return new CustomEvt()
  }
  _all() {
    const out = [];
    const walk = node => { node.children.forEach(c => { out.push(c); walk(c); }); };
    walk(this.body);
    return out;
  }
  querySelectorAll(selector) {
    const all = this._all();
    if (selector.startsWith('.')) {
      const cls = selector.slice(1);
      return all.filter(el => el.className.split(' ').includes(cls));
    }
    return all.filter(el => el.tagName === selector.toLowerCase());
  }
  querySelector(selector) {
    return this.querySelectorAll(selector)[0] || null;
  }
  getElementsByTagName(tag) {
    if (tag === 'body') return [this.body];
    return this.querySelectorAll(tag);
  }
  addEventListener() {}
}

const document = new Document();
const windowObj = {
  document,
  Element,
  CustomEvent,
  Event,
  innerWidth: 1024,
  innerHeight: 768
};

global.document = document;
global.window = windowObj;
