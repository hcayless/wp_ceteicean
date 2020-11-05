var ceteicean_behaviors = {
  "tei": {
    "head": function(e) {
      let level = Number.parseInt(e.getAttribute("data-level"));
      let result = document.createElement("h" + (level < 6 ? level : 6));
      for (let n of Array.from(e.childNodes)) {
        result.appendChild(n.cloneNode());
      }
      return result;
    },
    "lb": ["<br>"],
    "p": ["<p>","</p>"],
    "note": function(e){
      if (!this.noteIndex){
        this["noteIndex"] = 1;
      } else {
        this.noteIndex++;
      }
      let id = "note" + this.noteIndex;
      let link = document.createElement("a");
      link.setAttribute("id", "src" + id);
      link.setAttribute("href", "#" + id);
      link.innerHTML = this.noteIndex;
      let content = document.createElement("sup");
      if (e.previousSibling.localName == "tei-note") {
        content.appendChild(document.createTextNode(","));
      }
      content.appendChild(link);
      let notes = this.dom.querySelector("ol.notes");
      if (!notes) {
        notes = document.createElement("ol");
        notes.setAttribute("class", "notes");
        this.dom.appendChild(notes);
      }
      let note = document.createElement("li");
      note.id = id;
      note.innerHTML = "<a href=\"#src" + id + "\">^</a> " + e.innerHTML
      notes.appendChild(note);
      return content;
    },
    "table": function(elt) {
      let table = document.createElement("table");
      table.innerHTML = elt.innerHTML;
      if (table.firstElementChild.localName == "tei-head") {
        let head = table.firstElementChild;
        head.remove();
        let caption = document.createElement("caption");
        caption.innerHTML = head.innerHTML;
        table.appendChild(caption);
      }
      for (let row of Array.from(table.querySelectorAll("tei-row"))) {
        let tr = document.createElement("tr");
        tr.innerHTML = row.innerHTML;
        for (let attr of Array.from(row.attributes)) {
          tr.setAttribute(attr.name, attr.value);
        }
        row.parentElement.replaceChild(tr, row);
      }
      for (let cell of Array.from(table.querySelectorAll("tei-cell"))) {
        let td = document.createElement("td");
        if (cell.hasAttribute("cols")) {
          td.setAttribute("colspan", cell.getAttribute("cols"));
        }
        td.innerHTML = cell.innerHTML;
        for (let attr of Array.from(cell.attributes)) {
          td.setAttribute(attr.name, attr.value);
        }
        cell.parentElement.replaceChild(td, cell);
      }
      this.hideContent(elt, true);
      elt.appendChild(table);
    }
  }
}