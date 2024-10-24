const underlineText = (str: string): string => `<U> ${str} </U>`;
const boldText = (str: string): string => `<B> ${str} </B>`;

interface FieldOptions {
  type?: string;
}

interface CollectionOptions {
  backgroundColor: string;
  nameColor: string;
}

class ERD {
  name: string;
  nodes: Collection[];
  relations: string[];

  constructor(name: string) {
    this.name = name;
    this.nodes = [];
    this.relations = [];
  }

  addRelation(collection1: string, collection2: string, collection1Config: any): void {
    const tailLabel = '1';
    const headLabel = 'N';
    this.relations.push(`${collection2}:${collection1Config.foreignField} -> ${collection1}:${collection1Config.localField.index}  [label="${collection2}-${collection1}" arrowhead=none shape="none" headlabel="${headLabel}" taillabel = "${tailLabel}"]`);
  }

  addCollection(node: Collection): void {
    this.nodes.push(node);
  }

  generate(): string {
    return `
      digraph {
      splines=true; esep=1;
      graph [margin="0" pad="2", nodesep="1", ranksep="1"  overlap=false, splines=true];
      node [shape=record, fontsize=9]
      edge [style=dashed];
      rankdir=LR;
      ${this.nodes.map(node => node.generate()).join('\n')}
      ${this.relations.join('\n')}
      }
    `;
  }
}

class Collection {
  name: string;
  fields: { name: string; options: FieldOptions }[];
  options: CollectionOptions;

  constructor(name: string, options: CollectionOptions) {
    this.name = name;
    this.fields = [];
    this.options = options;
  }

  addField(name: string, options: FieldOptions): void {
    this.fields.push({ name, options });
  }

  generate(): string {
    const fieldsString: string[] = [];

    for (const field of this.fields) {
      let nameString = field.name;
      let options = field.options;
      let fieldString = nameString;
      if (options.type) {
        fieldString += ' [' + options.type + ']';
      }
      fieldsString.push(fieldString);
    }

    return `
      ${this.name} [shape="none" margin=0 label=<<table BGCOLOR="${this.options.backgroundColor}"  border="0" cellborder="1" cellspacing="0" cellpadding="4">
      <tr><td  bgcolor="${this.options.nameColor}"  align="center" cellpadding="3"><i>${boldText(this.name)}</i></td></tr>
      ${this.fields.map((field, i) => '<tr><td port=' + '"' + i + '"' + ' align="left" >' + field.name + ': ' + field.options.type + '</td></tr>').join('\n\t')}
      </table>>]
    `;
  }
}

export { ERD, Collection };
