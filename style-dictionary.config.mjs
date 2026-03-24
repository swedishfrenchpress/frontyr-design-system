const shadowTransform = {
  name: "shadow/css",
  type: "value",
  filter: (token) => token.$type === "boxShadow" || token.type === "boxShadow",
  transform: (token) => {
    const value = token.$value ?? token.value;
    const layers = Array.isArray(value) ? value : [value];
    return layers
      .map((s) => {
        const inset = s.type === "innerShadow" ? "inset " : "";
        return `${inset}${s.x}px ${s.y}px ${s.blur}px ${s.spread}px ${s.color}`;
      })
      .join(", ");
  },
};

const sizePxTransform = {
  name: "size/pxUnits",
  type: "value",
  filter: (token) => {
    const t = token.$type ?? token.type;
    return t === "fontSizes" || t === "letterSpacing" || t === "paragraphSpacing";
  },
  transform: (token) => {
    const v = token.$value ?? token.value;
    if (typeof v === "number") return `${v}px`;
    if (typeof v === "string" && /^-?[\d.]+$/.test(v)) return `${v}px`;
    return v;
  },
};

const nameKebab = {
  name: "name/kebabCustom",
  type: "name",
  transform: (token) => {
    return token.path
      .join("-")
      .toLowerCase()
      .replace(/[()]/g, "")
      .replace(/\s+/g, "-")
      .replace(/,/g, "")
      .replace(/-+/g, "-");
  },
};

export default {
  hooks: {
    transforms: {
      "shadow/css": shadowTransform,
      "size/pxUnits": sizePxTransform,
      "name/kebabCustom": nameKebab,
    },
  },
  source: [
    "tokens/primitives.tokens.json",
    "tokens/figma-tokens.json",
  ],
  platforms: {
    css: {
      transforms: [
        "attribute/cti",
        "name/kebabCustom",
        "size/pxUnits",
        "shadow/css",
        "color/css",
      ],
      buildPath: "src/app/",
      files: [
        {
          destination: "tokens.css",
          format: "css/variables",
          filter: (token) => {
            const t = token.$type ?? token.type;
            if (t === "typography") return false;
            if (t === "textCase") return false;
            if (t === "textDecoration") return false;
            if (t === "paragraphSpacing") return false;
            if (token.path[0] === "paragraphIndent") return false;
            return true;
          },
          options: {
            outputReferences: false,
          },
        },
      ],
    },
  },
};
