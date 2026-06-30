/* @ds-bundle: {"format":3,"namespace":"StackLearningDesignSystem_7ae9fc","components":[{"name":"Badge","sourcePath":"components/core/Badge.jsx"},{"name":"Button","sourcePath":"components/core/Button.jsx"},{"name":"Card","sourcePath":"components/core/Card.jsx"},{"name":"Icon","sourcePath":"components/core/Icon.jsx"},{"name":"Input","sourcePath":"components/core/Input.jsx"},{"name":"ProgressBar","sourcePath":"components/core/ProgressBar.jsx"},{"name":"Tabs","sourcePath":"components/core/Tabs.jsx"}],"sourceHashes":{"components/core/Badge.jsx":"027ba3c75092","components/core/Button.jsx":"300b7242716e","components/core/Card.jsx":"80112dfa70cf","components/core/Icon.jsx":"4ecf968dfc12","components/core/Input.jsx":"e64f93793ee3","components/core/ProgressBar.jsx":"66c19116c889","components/core/Tabs.jsx":"2b64861fb4fd","ui_kits/sketchain-academy/HomeScreen.jsx":"42d2a05ba1fc","ui_kits/sketchain-academy/LessonScreen.jsx":"fa2b179b8c3c","ui_kits/sketchain-academy/LoginScreen.jsx":"24e45d786fc1","ui_kits/sketchain-academy/data.js":"bd18a7e4a45a"},"inlinedExternals":[],"unexposedExports":[{"name":"iconNames","sourcePath":"components/core/Icon.jsx"}]} */

(() => {

const __ds_ns = (window.StackLearningDesignSystem_7ae9fc = window.StackLearningDesignSystem_7ae9fc || {});

const __ds_scope = {};

(__ds_ns.__errors = __ds_ns.__errors || []);

// components/core/Badge.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/**
 * Stack Learning badge — small label with a colored border over a soft tint
 * of the same color (the product's "tone" pattern). Pass any CSS color via
 * `color`; convenience tones map to brand/difficulty colors.
 */
const TONES = {
  terracota: 'var(--accent-primary)',
  gold: 'var(--accent-secondary)',
  neutral: 'var(--text-muted)',
  beginner: 'var(--color-level-beginner)',
  intermediate: 'var(--color-level-intermediate)',
  advanced: 'var(--color-level-advanced)',
  react: 'var(--tech-react)',
  nextjs: 'var(--tech-nextjs)',
  typescript: 'var(--tech-typescript)',
  tailwind: 'var(--tech-tailwind)',
  shadcn: 'var(--tech-shadcn)',
  supabase: 'var(--tech-supabase)'
};
function Badge({
  children,
  tone = 'terracota',
  color,
  solid = false,
  style = {},
  ...rest
}) {
  const c = color ?? TONES[tone] ?? TONES.terracota;
  return /*#__PURE__*/React.createElement("span", _extends({
    style: {
      display: 'inline-flex',
      alignItems: 'center',
      gap: '5px',
      padding: '3px 10px',
      fontSize: '12px',
      fontFamily: 'var(--font-brand)',
      fontWeight: 'var(--weight-semibold)',
      lineHeight: 1.5,
      borderRadius: 'var(--radius-sm)',
      border: `1px solid ${c}`,
      color: solid ? '#0F0F0F' : c,
      background: solid ? c : `color-mix(in srgb, ${c} 13%, transparent)`,
      whiteSpace: 'nowrap',
      ...style
    }
  }, rest), children);
}
Object.assign(__ds_scope, { Badge });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/Badge.jsx", error: String((e && e.message) || e) }); }

// components/core/Card.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/**
 * Stack Learning surface card. `accent` adds the product's 4px colored
 * left-border; `hover` enables the scale+shadow lift on pointer.
 */
function Card({
  children,
  accent,
  hover = false,
  padding = 16,
  style = {},
  onClick,
  ...rest
}) {
  const [over, setOver] = React.useState(false);
  const lift = hover && over;
  return /*#__PURE__*/React.createElement("div", _extends({
    onClick: onClick,
    onMouseEnter: () => setOver(true),
    onMouseLeave: () => setOver(false),
    style: {
      background: 'var(--surface-card)',
      border: '1px solid var(--border-default)',
      borderLeft: accent ? `4px solid ${accent}` : '1px solid var(--border-default)',
      borderRadius: 'var(--radius-lg)',
      padding: typeof padding === 'number' ? `${padding}px` : padding,
      cursor: onClick ? 'pointer' : 'default',
      transform: lift ? 'scale(1.02)' : 'scale(1)',
      boxShadow: lift ? 'var(--shadow-card-hover)' : 'none',
      transition: 'transform 300ms ease-in-out, box-shadow 300ms ease-in-out, border-color 200ms',
      ...style
    }
  }, rest), children);
}
Object.assign(__ds_scope, { Card });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/Card.jsx", error: String((e && e.message) || e) }); }

// components/core/Icon.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/**
 * Stack Learning icon library — minimalist line icons (24x24 grid, 1.6px
 * stroke, round caps/joins, currentColor). Paths are inlined so the icon
 * always renders (no external-sprite <use> quirks).
 */
const PATHS = {
  check: /*#__PURE__*/React.createElement("path", {
    d: "M5 12.5 10 17.5 19 6.5"
  }),
  'check-circle': /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("circle", {
    cx: "12",
    cy: "12",
    r: "8.5"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M8.2 12.2 11 15 15.8 9.2"
  })),
  lock: /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("rect", {
    x: "5.5",
    y: "10.5",
    width: "13",
    height: "9",
    rx: "2"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M8 10.5V8a4 4 0 0 1 8 0v2.5"
  })),
  play: /*#__PURE__*/React.createElement("path", {
    d: "M8 5.5 18.5 12 8 18.5V5.5Z"
  }),
  bookmark: /*#__PURE__*/React.createElement("path", {
    d: "M7 4.5h10a1 1 0 0 1 1 1v14l-6-4-6 4v-14a1 1 0 0 1 1-1Z"
  }),
  bulb: /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("path", {
    d: "M9 17h6M9.5 20h5"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M12 3.5a6 6 0 0 1 3.7 10.7c-.7.6-1.2 1.2-1.2 2.3h-5c0-1.1-.5-1.7-1.2-2.3A6 6 0 0 1 12 3.5Z"
  })),
  mail: /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("rect", {
    x: "3.5",
    y: "5.5",
    width: "17",
    height: "13",
    rx: "2"
  }), /*#__PURE__*/React.createElement("path", {
    d: "m4 7 8 6 8-6"
  })),
  phone: /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("rect", {
    x: "7",
    y: "3.5",
    width: "10",
    height: "17",
    rx: "2"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M11 17.5h2"
  })),
  clock: /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("circle", {
    cx: "12",
    cy: "12",
    r: "8.5"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M12 7.5V12l3 2"
  })),
  'chevron-left': /*#__PURE__*/React.createElement("path", {
    d: "M14.5 6 8.5 12l6 6"
  }),
  'chevron-right': /*#__PURE__*/React.createElement("path", {
    d: "M9.5 6 15.5 12l-6 6"
  }),
  'arrow-right': /*#__PURE__*/React.createElement("path", {
    d: "M4.5 12h15M13 5.5 19.5 12 13 18.5"
  }),
  'arrow-left': /*#__PURE__*/React.createElement("path", {
    d: "M19.5 12h-15M11 5.5 4.5 12 11 18.5"
  }),
  code: /*#__PURE__*/React.createElement("path", {
    d: "m8.5 8-4 4 4 4M15.5 8l4 4-4 4M13.5 5.5l-3 13"
  }),
  terminal: /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("rect", {
    x: "3.5",
    y: "4.5",
    width: "17",
    height: "15",
    rx: "2"
  }), /*#__PURE__*/React.createElement("path", {
    d: "m7 9.5 3 2.5-3 2.5M12.5 15h4"
  })),
  book: /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("path", {
    d: "M4 5.5A2 2 0 0 1 6 4h6v15H6a2 2 0 0 0-2 1.5V5.5Z"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M20 5.5A2 2 0 0 0 18 4h-6v15h6a2 2 0 0 1 2 1.5V5.5Z"
  })),
  layers: /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("path", {
    d: "M12 3.5 21 8l-9 4.5L3 8l9-4.5Z"
  }), /*#__PURE__*/React.createElement("path", {
    d: "m3 12.5 9 4.5 9-4.5M3 16.5 12 21l9-4.5"
  })),
  search: /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("circle", {
    cx: "11",
    cy: "11",
    r: "6.5"
  }), /*#__PURE__*/React.createElement("path", {
    d: "m16 16 4 4"
  })),
  user: /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("circle", {
    cx: "12",
    cy: "8.5",
    r: "3.8"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M5 20c.8-3.4 3.6-5.5 7-5.5s6.2 2.1 7 5.5"
  })),
  menu: /*#__PURE__*/React.createElement("path", {
    d: "M4 7h16M4 12h16M4 17h16"
  }),
  external: /*#__PURE__*/React.createElement("path", {
    d: "M14 5h5v5M19 5l-8 8M17 13.5V18a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V9a2 2 0 0 1 2-2h4.5"
  }),
  sparkle: /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("path", {
    d: "M12 4c.6 3.6 1.8 4.8 5.4 5.4-3.6.6-4.8 1.8-5.4 5.4-.6-3.6-1.8-4.8-5.4-5.4C10.2 8.8 11.4 7.6 12 4Z"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M18 15c.3 1.5.8 2 2.3 2.3-1.5.3-2 .8-2.3 2.3-.3-1.5-.8-2-2.3-2.3 1.5-.3 2-.8 2.3-2.3Z"
  })),
  plus: /*#__PURE__*/React.createElement("path", {
    d: "M12 5v14M5 12h14"
  }),
  x: /*#__PURE__*/React.createElement("path", {
    d: "M6 6l12 12M18 6 6 18"
  }),
  'circle-dot': /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("circle", {
    cx: "12",
    cy: "12",
    r: "8.5"
  }), /*#__PURE__*/React.createElement("circle", {
    cx: "12",
    cy: "12",
    r: "2.5",
    fill: "currentColor",
    stroke: "none"
  }))
};

// Filled variants (use fill instead of stroke-only)
const FILLED = {
  'bookmark-fill': /*#__PURE__*/React.createElement("path", {
    d: "M7 4.5h10a1 1 0 0 1 1 1v14l-6-4-6 4v-14a1 1 0 0 1 1-1Z"
  })
};
function Icon({
  name,
  size = 20,
  strokeWidth = 1.6,
  className = '',
  style = {},
  ...rest
}) {
  const filled = FILLED[name];
  const content = filled ?? PATHS[name] ?? PATHS['circle-dot'];
  return /*#__PURE__*/React.createElement("svg", _extends({
    width: size,
    height: size,
    viewBox: "0 0 24 24",
    fill: filled ? 'currentColor' : 'none',
    stroke: "currentColor",
    strokeWidth: strokeWidth,
    strokeLinecap: "round",
    strokeLinejoin: "round",
    className: className,
    style: {
      flexShrink: 0,
      display: 'block',
      ...style
    },
    "aria-hidden": "true"
  }, rest), content);
}
const iconNames = [...Object.keys(PATHS), ...Object.keys(FILLED)];
Object.assign(__ds_scope, { Icon, iconNames });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/Icon.jsx", error: String((e && e.message) || e) }); }

// components/core/Button.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
const VARIANTS = {
  primary: {
    background: 'var(--accent-primary)',
    color: '#fff',
    border: '1px solid var(--accent-primary)'
  },
  secondary: {
    background: 'transparent',
    color: 'var(--accent-secondary)',
    border: '1px solid var(--accent-secondary)'
  },
  outline: {
    background: 'transparent',
    color: 'var(--text-primary)',
    border: '1px solid var(--border-strong)'
  },
  ghost: {
    background: 'transparent',
    color: 'var(--text-primary)',
    border: '1px solid transparent'
  },
  success: {
    background: 'var(--color-success)',
    color: '#fff',
    border: '1px solid var(--color-success)'
  }
};
const SIZES = {
  sm: {
    padding: '7px 14px',
    fontSize: '13px',
    gap: '6px',
    iconSize: 15
  },
  md: {
    padding: '10px 18px',
    fontSize: '14px',
    gap: '8px',
    iconSize: 17
  },
  lg: {
    padding: '13px 24px',
    fontSize: '15px',
    gap: '9px',
    iconSize: 19
  }
};

/** Stack Learning button. Variants: primary | secondary | outline | ghost | success. */
function Button({
  children,
  variant = 'primary',
  size = 'md',
  iconLeft,
  iconRight,
  fullWidth = false,
  disabled = false,
  style = {},
  ...rest
}) {
  const v = VARIANTS[variant] ?? VARIANTS.primary;
  const s = SIZES[size] ?? SIZES.md;
  const [hover, setHover] = React.useState(false);
  const hoverStyle = !disabled && hover ? variant === 'ghost' ? {
    background: 'var(--surface-card)'
  } : variant === 'primary' || variant === 'success' ? {
    opacity: 0.9
  } : {
    background: 'var(--color-terracota-soft)'
  } : {};
  return /*#__PURE__*/React.createElement("button", _extends({
    type: "button",
    disabled: disabled,
    onMouseEnter: () => setHover(true),
    onMouseLeave: () => setHover(false),
    style: {
      display: 'inline-flex',
      alignItems: 'center',
      justifyContent: 'center',
      gap: s.gap,
      width: fullWidth ? '100%' : 'auto',
      padding: s.padding,
      fontSize: s.fontSize,
      fontFamily: 'var(--font-brand)',
      fontWeight: 'var(--weight-bold)',
      lineHeight: 1,
      borderRadius: 'var(--radius-md)',
      cursor: disabled ? 'not-allowed' : 'pointer',
      opacity: disabled ? 0.5 : 1,
      whiteSpace: 'nowrap',
      transition: 'opacity 200ms, background 200ms, border-color 200ms, color 200ms',
      ...v,
      ...hoverStyle,
      ...style
    }
  }, rest), iconLeft && /*#__PURE__*/React.createElement(__ds_scope.Icon, {
    name: iconLeft,
    size: s.iconSize
  }), children, iconRight && /*#__PURE__*/React.createElement(__ds_scope.Icon, {
    name: iconRight,
    size: s.iconSize
  }));
}
Object.assign(__ds_scope, { Button });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/Button.jsx", error: String((e && e.message) || e) }); }

// components/core/Input.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/** Stack Learning text input — dark field, terracota focus border. */
function Input({
  label,
  icon,
  type = 'text',
  style = {},
  id,
  ...rest
}) {
  const [focus, setFocus] = React.useState(false);
  const inputId = id || (label ? `in-${label.replace(/\s+/g, '-').toLowerCase()}` : undefined);
  const field = /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'relative',
      display: 'flex',
      alignItems: 'center'
    }
  }, icon && /*#__PURE__*/React.createElement("span", {
    style: {
      position: 'absolute',
      left: '12px',
      color: 'var(--text-muted)',
      pointerEvents: 'none',
      display: 'flex'
    }
  }, icon), /*#__PURE__*/React.createElement("input", _extends({
    id: inputId,
    type: type,
    onFocus: () => setFocus(true),
    onBlur: () => setFocus(false),
    style: {
      width: '100%',
      padding: icon ? '10px 12px 10px 38px' : '10px 12px',
      background: 'var(--bg-app)',
      border: `1px solid ${focus ? 'var(--accent-primary)' : 'var(--border-strong)'}`,
      borderRadius: 'var(--radius-sm)',
      color: 'var(--text-primary)',
      fontSize: '14px',
      fontFamily: 'var(--font-brand)',
      outline: 'none',
      transition: 'border-color 200ms',
      ...style
    }
  }, rest)));
  if (!label) return field;
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: '6px'
    }
  }, /*#__PURE__*/React.createElement("label", {
    htmlFor: inputId,
    style: {
      color: 'var(--text-primary)',
      fontSize: '13px',
      fontFamily: 'var(--font-brand)'
    }
  }, label), field);
}
Object.assign(__ds_scope, { Input });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/Input.jsx", error: String((e && e.message) || e) }); }

// components/core/ProgressBar.jsx
try { (() => {
/**
 * Stack Learning progress bar — thin track with an animated fill. `color`
 * defaults to terracota; pass a technology color for track pages.
 */
function ProgressBar({
  value = 0,
  color = 'var(--accent-primary)',
  height = 6,
  track = 'var(--border-default)',
  style = {}
}) {
  const pct = Math.max(0, Math.min(100, value));
  return /*#__PURE__*/React.createElement("div", {
    role: "progressbar",
    "aria-valuenow": pct,
    "aria-valuemin": 0,
    "aria-valuemax": 100,
    style: {
      background: track,
      height: `${height}px`,
      borderRadius: 'var(--radius-sm)',
      overflow: 'hidden',
      ...style
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      background: color,
      width: `${pct}%`,
      height: '100%',
      borderRadius: 'var(--radius-sm)',
      transition: 'width 300ms ease-in-out'
    }
  }));
}
Object.assign(__ds_scope, { ProgressBar });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/ProgressBar.jsx", error: String((e && e.message) || e) }); }

// components/core/Tabs.jsx
try { (() => {
/**
 * Stack Learning tabs — underline style. Active tab gets a terracota bottom
 * border + bold terracota label; inactive tabs are muted gray.
 * `tabs` is an array of { id, label }.
 */
function Tabs({
  tabs = [],
  value,
  onChange,
  style = {}
}) {
  const [internal, setInternal] = React.useState(value ?? tabs[0]?.id);
  const active = value ?? internal;
  const select = id => {
    setInternal(id);
    onChange?.(id);
  };
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: 0,
      borderBottom: '1px solid var(--border-default)',
      ...style
    }
  }, tabs.map(t => {
    const on = t.id === active;
    return /*#__PURE__*/React.createElement("button", {
      key: t.id,
      type: "button",
      onClick: () => select(t.id),
      style: {
        background: 'none',
        border: 'none',
        borderBottom: on ? '2px solid var(--accent-primary)' : '2px solid transparent',
        color: on ? 'var(--accent-primary)' : 'var(--text-muted)',
        padding: '10px 20px',
        cursor: 'pointer',
        fontSize: '14px',
        fontFamily: 'var(--font-brand)',
        fontWeight: on ? 'var(--weight-bold)' : 'var(--weight-regular)',
        marginBottom: '-1px',
        transition: 'color 200ms, border-color 200ms'
      }
    }, t.label);
  }));
}
Object.assign(__ds_scope, { Tabs });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/Tabs.jsx", error: String((e && e.message) || e) }); }

// ui_kits/sketchain-academy/HomeScreen.jsx
try { (() => {
// Sketchain Academy — Home: hero, sequential track carousel, technology grid.
const {
  Card,
  ProgressBar,
  Icon
} = window.StackLearningDesignSystem_7ae9fc;
function StatusGlyph({
  done,
  locked
}) {
  if (done) return /*#__PURE__*/React.createElement(Icon, {
    name: "check-circle",
    size: 18,
    style: {
      color: 'var(--color-success-bright)'
    }
  });
  if (locked) return /*#__PURE__*/React.createElement(Icon, {
    name: "lock",
    size: 16,
    style: {
      color: 'var(--text-muted)'
    }
  });
  return /*#__PURE__*/React.createElement(Icon, {
    name: "play",
    size: 16,
    style: {
      color: 'var(--accent-primary)'
    }
  });
}
function SectionTitle({
  children
}) {
  return /*#__PURE__*/React.createElement("h2", {
    style: {
      color: 'var(--text-primary)',
      fontSize: 21,
      fontWeight: 700,
      margin: '0 0 18px',
      fontFamily: 'var(--font-brand)'
    }
  }, children);
}
function HomeScreen({
  onOpenLesson,
  onOpenTrack
}) {
  const D = window.SLData;
  return /*#__PURE__*/React.createElement("div", {
    style: {
      background: 'var(--bg-app)',
      minHeight: '100%'
    }
  }, /*#__PURE__*/React.createElement("section", {
    className: "sl-fade-in",
    style: {
      background: 'var(--brand-gradient)',
      padding: '56px 40px',
      textAlign: 'center'
    }
  }, /*#__PURE__*/React.createElement("h1", {
    style: {
      fontSize: 'clamp(30px,6vw,56px)',
      fontWeight: 800,
      color: '#fff',
      margin: '0 0 12px',
      textShadow: '0 2px 8px rgba(0,0,0,0.3)',
      fontFamily: 'var(--font-brand)',
      letterSpacing: '-1px'
    }
  }, "Aprenda o Stack Sketchain"), /*#__PURE__*/React.createElement("p", {
    style: {
      fontSize: 18,
      color: 'rgba(255,255,255,0.92)',
      fontWeight: 500,
      margin: 0,
      fontFamily: 'var(--font-brand)'
    }
  }, "Do Zero ao S\xEAnior em 8\u201310 semanas")), /*#__PURE__*/React.createElement("section", {
    style: {
      padding: '36px 40px 0'
    }
  }, /*#__PURE__*/React.createElement(SectionTitle, null, "Trilha Sequencial"), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: 12,
      overflowX: 'auto',
      paddingBottom: 6
    }
  }, D.sequential.map((l, i) => /*#__PURE__*/React.createElement(Card, {
    key: l.id,
    hover: !l.locked,
    padding: 16,
    onClick: () => !l.locked && onOpenLesson(l.id),
    style: {
      minWidth: 184,
      flexShrink: 0,
      opacity: l.locked ? 0.5 : 1,
      cursor: l.locked ? 'not-allowed' : 'pointer'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'flex-start'
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 30,
      fontWeight: 800,
      color: 'var(--accent-primary)',
      lineHeight: 1,
      fontFamily: 'var(--font-brand)'
    }
  }, String(i + 1).padStart(2, '0')), /*#__PURE__*/React.createElement(StatusGlyph, {
    done: l.done,
    locked: l.locked
  })), /*#__PURE__*/React.createElement("p", {
    style: {
      color: 'var(--text-primary)',
      fontSize: 13.5,
      margin: '12px 0 14px',
      lineHeight: 1.4,
      minHeight: 38,
      fontFamily: 'var(--font-brand)'
    }
  }, l.title), /*#__PURE__*/React.createElement(ProgressBar, {
    value: l.done ? 100 : 0,
    height: 3
  }))))), /*#__PURE__*/React.createElement("section", {
    style: {
      padding: '40px 40px 56px'
    }
  }, /*#__PURE__*/React.createElement(SectionTitle, null, "Por Tecnologia"), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fill,minmax(240px,1fr))',
      gap: 16
    }
  }, D.tracks.map(t => {
    const pct = Math.round(t.done / t.total * 100);
    return /*#__PURE__*/React.createElement(Card, {
      key: t.id,
      hover: true,
      accent: t.color,
      padding: 20,
      onClick: () => onOpenTrack(t.id),
      style: {
        cursor: 'pointer'
      }
    }, /*#__PURE__*/React.createElement("h3", {
      style: {
        color: 'var(--text-primary)',
        fontSize: 16,
        fontWeight: 700,
        margin: '0 0 6px',
        fontFamily: 'var(--font-brand)'
      }
    }, t.name), /*#__PURE__*/React.createElement("p", {
      style: {
        color: 'var(--text-muted)',
        fontSize: 13,
        margin: '0 0 14px',
        lineHeight: 1.4,
        fontFamily: 'var(--font-brand)'
      }
    }, t.desc), /*#__PURE__*/React.createElement("p", {
      style: {
        color: 'var(--text-muted)',
        fontSize: 12,
        margin: '0 0 7px',
        fontFamily: 'var(--font-brand)'
      }
    }, t.done, "/", t.total, " aulas completas"), /*#__PURE__*/React.createElement(ProgressBar, {
      value: pct,
      color: t.color,
      height: 3
    }));
  }))));
}
window.HomeScreen = HomeScreen;
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/sketchain-academy/HomeScreen.jsx", error: String((e && e.message) || e) }); }

// ui_kits/sketchain-academy/LessonScreen.jsx
try { (() => {
// Sketchain Academy — Lesson detail: breadcrumb, tabs, content/code, sidebar.
const {
  Card,
  Badge,
  Button,
  Tabs,
  ProgressBar,
  Icon
} = window.StackLearningDesignSystem_7ae9fc;
function CodeBlock({
  code
}) {
  return /*#__PURE__*/React.createElement("div", {
    style: {
      border: '1px solid var(--border-default)',
      borderRadius: 'var(--radius-lg)',
      overflow: 'hidden',
      margin: '12px 0 4px'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      background: 'var(--surface-code)',
      padding: '8px 14px',
      borderBottom: '1px solid var(--border-default)',
      display: 'flex',
      alignItems: 'center',
      gap: 7
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      width: 11,
      height: 11,
      borderRadius: '50%',
      background: '#E74C3C'
    }
  }), /*#__PURE__*/React.createElement("span", {
    style: {
      width: 11,
      height: 11,
      borderRadius: '50%',
      background: '#F39C12'
    }
  }), /*#__PURE__*/React.createElement("span", {
    style: {
      width: 11,
      height: 11,
      borderRadius: '50%',
      background: '#27AE60'
    }
  }), /*#__PURE__*/React.createElement("span", {
    style: {
      color: 'var(--text-muted)',
      fontSize: 11,
      marginLeft: 6,
      fontFamily: 'var(--font-mono)'
    }
  }, "index.tsx")), /*#__PURE__*/React.createElement("pre", {
    style: {
      margin: 0,
      padding: '14px 16px',
      background: 'var(--surface-code)',
      color: '#E5E5E5',
      fontFamily: 'var(--font-mono)',
      fontSize: 13,
      lineHeight: 1.7,
      overflowX: 'auto'
    }
  }, code));
}
function SideCard({
  children
}) {
  return /*#__PURE__*/React.createElement(Card, {
    padding: 16,
    style: {
      display: 'flex',
      flexDirection: 'column'
    }
  }, children);
}
function Label({
  children
}) {
  return /*#__PURE__*/React.createElement("p", {
    style: {
      color: 'var(--text-muted)',
      fontSize: 12.5,
      margin: '0 0 10px',
      fontFamily: 'var(--font-brand)'
    }
  }, children);
}
function LessonScreen({
  onNavigate
}) {
  const L = window.SLData.lesson;
  const [tab, setTab] = React.useState('conteudo');
  const [done, setDone] = React.useState(false);
  const [saved, setSaved] = React.useState(false);
  const pct = Math.round(L.track.done / L.track.total * 100);
  return /*#__PURE__*/React.createElement("div", {
    style: {
      background: 'var(--bg-app)',
      minHeight: '100%',
      padding: '28px 40px'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: 8,
      alignItems: 'center',
      marginBottom: 22,
      fontFamily: 'var(--font-brand)'
    }
  }, /*#__PURE__*/React.createElement("button", {
    onClick: () => onNavigate('home'),
    style: {
      background: 'none',
      border: 'none',
      color: 'var(--text-link)',
      cursor: 'pointer',
      fontSize: 13.5,
      padding: 0
    }
  }, "Home"), /*#__PURE__*/React.createElement(Icon, {
    name: "chevron-right",
    size: 14,
    style: {
      color: 'var(--text-muted)'
    }
  }), /*#__PURE__*/React.createElement("span", {
    style: {
      color: 'var(--text-muted)',
      fontSize: 13.5
    }
  }, L.technology), /*#__PURE__*/React.createElement(Icon, {
    name: "chevron-right",
    size: 14,
    style: {
      color: 'var(--text-muted)'
    }
  }), /*#__PURE__*/React.createElement("span", {
    style: {
      color: 'var(--text-primary)',
      fontSize: 13.5
    }
  }, L.title)), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      gridTemplateColumns: '1fr 300px',
      gap: 32,
      alignItems: 'start'
    }
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("h1", {
    style: {
      color: 'var(--accent-primary)',
      fontSize: 29,
      fontWeight: 700,
      margin: '0 0 16px',
      fontFamily: 'var(--font-brand)'
    }
  }, L.title), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: 10,
      flexWrap: 'wrap',
      marginBottom: 24
    }
  }, /*#__PURE__*/React.createElement(Badge, {
    tone: "terracota"
  }, L.technology), /*#__PURE__*/React.createElement(Badge, {
    tone: "beginner"
  }, L.difficulty), /*#__PURE__*/React.createElement(Badge, {
    tone: "neutral"
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "clock",
    size: 13
  }), " ", L.time, " min")), /*#__PURE__*/React.createElement(Tabs, {
    value: tab,
    onChange: setTab,
    style: {
      marginBottom: 22
    },
    tabs: [{
      id: 'conteudo',
      label: 'Conteúdo'
    }, {
      id: 'lab',
      label: 'Mini-Lab'
    }, {
      id: 'recursos',
      label: 'Recursos'
    }]
  }), tab === 'conteudo' && /*#__PURE__*/React.createElement("div", {
    style: {
      color: 'var(--text-primary)',
      fontFamily: 'var(--font-body)',
      fontSize: 15,
      lineHeight: 1.6
    }
  }, /*#__PURE__*/React.createElement("p", {
    style: {
      marginTop: 0
    }
  }, L.intro), L.sections.map(s => /*#__PURE__*/React.createElement("div", {
    key: s.h
  }, /*#__PURE__*/React.createElement("h2", {
    style: {
      fontSize: 19,
      fontWeight: 700,
      color: 'var(--text-primary)',
      margin: '24px 0 4px',
      fontFamily: 'var(--font-brand)'
    }
  }, s.h), /*#__PURE__*/React.createElement(CodeBlock, {
    code: s.code
  })))), tab === 'lab' && /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("p", {
    style: {
      color: 'var(--text-primary)',
      fontSize: 15,
      marginBottom: 14,
      fontFamily: 'var(--font-body)'
    }
  }, "Implemente o componente ", /*#__PURE__*/React.createElement("code", {
    style: {
      background: 'var(--surface-card)',
      padding: '2px 7px',
      borderRadius: 4,
      color: '#9CDCFE',
      fontFamily: 'var(--font-mono)',
      fontSize: 13
    }
  }, "Counter"), " usando ", /*#__PURE__*/React.createElement("code", {
    style: {
      background: 'var(--surface-card)',
      padding: '2px 7px',
      borderRadius: 4,
      color: '#9CDCFE',
      fontFamily: 'var(--font-mono)',
      fontSize: 13
    }
  }, "useState"), ":"), /*#__PURE__*/React.createElement(CodeBlock, {
    code: "export function Counter() {\n  const [n, setN] = useState(0);\n  // seu código aqui\n}"
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: 10,
      marginTop: 12
    }
  }, /*#__PURE__*/React.createElement(Button, {
    variant: "outline",
    size: "sm",
    iconLeft: "play",
    disabled: true
  }, "Executar"), /*#__PURE__*/React.createElement(Button, {
    variant: "secondary",
    size: "sm",
    iconLeft: "bulb"
  }, "Ver Solu\xE7\xE3o"))), tab === 'recursos' && /*#__PURE__*/React.createElement("div", {
    style: {
      color: 'var(--text-primary)',
      fontFamily: 'var(--font-brand)'
    }
  }, /*#__PURE__*/React.createElement("h3", {
    style: {
      fontSize: 16,
      fontWeight: 700,
      marginTop: 0
    }
  }, "Links \xDAteis"), /*#__PURE__*/React.createElement("ul", {
    style: {
      lineHeight: 2.2,
      paddingLeft: 18
    }
  }, /*#__PURE__*/React.createElement("li", null, /*#__PURE__*/React.createElement("a", {
    href: "#",
    style: {
      color: 'var(--text-link)'
    }
  }, "Documenta\xE7\xE3o oficial do React")), /*#__PURE__*/React.createElement("li", null, /*#__PURE__*/React.createElement("a", {
    href: "#",
    style: {
      color: 'var(--text-link)'
    }
  }, "Blog: O que h\xE1 de novo no React 19"))))), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: 16,
      position: 'sticky',
      top: 90
    }
  }, /*#__PURE__*/React.createElement(SideCard, null, /*#__PURE__*/React.createElement(Label, null, "Progresso da Trilha"), /*#__PURE__*/React.createElement("p", {
    style: {
      color: 'var(--text-primary)',
      fontSize: 18,
      fontWeight: 700,
      margin: '0 0 10px',
      fontFamily: 'var(--font-brand)'
    }
  }, pct, "%"), /*#__PURE__*/React.createElement(ProgressBar, {
    value: pct
  }), /*#__PURE__*/React.createElement("p", {
    style: {
      color: 'var(--text-muted)',
      fontSize: 12,
      margin: '8px 0 0',
      fontFamily: 'var(--font-brand)'
    }
  }, L.track.done, " de ", L.track.total, " aulas completas")), /*#__PURE__*/React.createElement(SideCard, null, /*#__PURE__*/React.createElement(Button, {
    variant: done ? 'success' : 'primary',
    fullWidth: true,
    iconLeft: done ? 'check' : undefined,
    onClick: () => setDone(d => !d),
    style: {
      marginBottom: 10
    }
  }, done ? 'Concluída' : 'Marcar como Concluída'), /*#__PURE__*/React.createElement(Button, {
    variant: saved ? 'secondary' : 'outline',
    fullWidth: true,
    iconLeft: saved ? 'bookmark-fill' : 'bookmark',
    onClick: () => setSaved(s => !s)
  }, saved ? 'Salvo' : 'Salvar')), /*#__PURE__*/React.createElement(SideCard, null, /*#__PURE__*/React.createElement(Label, null, "Pr\xF3xima Aula"), /*#__PURE__*/React.createElement("p", {
    style: {
      color: 'var(--text-primary)',
      fontSize: 14,
      margin: '0 0 12px',
      fontFamily: 'var(--font-brand)'
    }
  }, L.next), /*#__PURE__*/React.createElement(Button, {
    variant: "secondary",
    size: "sm",
    fullWidth: true,
    iconRight: "arrow-right",
    disabled: !done
  }, "Ir para pr\xF3xima"), !done && /*#__PURE__*/React.createElement("p", {
    style: {
      color: 'var(--text-muted)',
      fontSize: 12,
      fontStyle: 'italic',
      margin: '10px 0 0',
      fontFamily: 'var(--font-brand)'
    }
  }, "Complete essa aula para desbloquear")))));
}
window.LessonScreen = LessonScreen;
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/sketchain-academy/LessonScreen.jsx", error: String((e && e.message) || e) }); }

// ui_kits/sketchain-academy/LoginScreen.jsx
try { (() => {
// Sketchain Academy — Login screen.
const {
  Card,
  Button,
  Input,
  Icon
} = window.StackLearningDesignSystem_7ae9fc;
function LoginScreen({
  onNavigate
}) {
  return /*#__PURE__*/React.createElement("div", {
    style: {
      minHeight: '100%',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      background: 'var(--bg-app)',
      padding: 40
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      width: '100%',
      maxWidth: 400
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 10,
      justifyContent: 'center',
      marginBottom: 24
    }
  }, /*#__PURE__*/React.createElement("img", {
    src: "../../assets/logo-symbol.svg",
    height: "34",
    alt: ""
  }), /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: 'var(--font-brand)',
      fontWeight: 700,
      fontSize: 19,
      color: 'var(--text-primary)'
    }
  }, "Sketchain ", /*#__PURE__*/React.createElement("span", {
    style: {
      color: 'var(--accent-primary)'
    }
  }, "Academy"))), /*#__PURE__*/React.createElement(Card, {
    padding: 36,
    style: {
      border: '1px solid var(--accent-primary)'
    }
  }, /*#__PURE__*/React.createElement("h2", {
    style: {
      color: 'var(--accent-primary)',
      fontSize: 22,
      fontWeight: 700,
      margin: '0 0 22px',
      fontFamily: 'var(--font-brand)'
    }
  }, "Entrar"), /*#__PURE__*/React.createElement("form", {
    onSubmit: e => {
      e.preventDefault();
      onNavigate('home');
    },
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: 16
    }
  }, /*#__PURE__*/React.createElement(Input, {
    label: "Email",
    type: "email",
    placeholder: "seu@email.com",
    icon: /*#__PURE__*/React.createElement(Icon, {
      name: "mail",
      size: 16
    }),
    required: true
  }), /*#__PURE__*/React.createElement(Input, {
    label: "Senha",
    type: "password",
    placeholder: "\u2022\u2022\u2022\u2022\u2022\u2022\u2022\u2022",
    icon: /*#__PURE__*/React.createElement(Icon, {
      name: "lock",
      size: 16
    }),
    required: true
  }), /*#__PURE__*/React.createElement(Button, {
    type: "submit",
    fullWidth: true,
    style: {
      marginTop: 6
    }
  }, "Entrar")), /*#__PURE__*/React.createElement("p", {
    style: {
      color: 'var(--text-muted)',
      fontSize: 13.5,
      marginTop: 20,
      textAlign: 'center',
      fontFamily: 'var(--font-brand)'
    }
  }, "N\xE3o tem conta? ", /*#__PURE__*/React.createElement("a", {
    href: "#",
    onClick: e => e.preventDefault(),
    style: {
      color: 'var(--text-link)'
    }
  }, "Registre-se")))));
}
window.LoginScreen = LoginScreen;
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/sketchain-academy/LoginScreen.jsx", error: String((e && e.message) || e) }); }

// ui_kits/sketchain-academy/data.js
try { (() => {
// Sample curriculum data for the Sketchain Academy UI kit (pt-BR, mirrors the product).
window.SLData = {
  tracks: [{
    id: 'react',
    name: 'React 19',
    desc: 'Componentes, hooks e context',
    color: 'var(--tech-react)',
    done: 3,
    total: 5
  }, {
    id: 'nextjs',
    name: 'Next.js 15.5',
    desc: 'App Router, Server Components e deploy',
    color: 'var(--tech-nextjs)',
    done: 1,
    total: 5
  }, {
    id: 'typescript',
    name: 'TypeScript',
    desc: 'Tipos, generics e boas práticas',
    color: 'var(--tech-typescript)',
    done: 0,
    total: 4
  }, {
    id: 'tailwind',
    name: 'Tailwind CSS 4',
    desc: 'Utility-first, responsividade e dark mode',
    color: 'var(--tech-tailwind)',
    done: 2,
    total: 3
  }, {
    id: 'shadcn',
    name: 'shadcn/ui',
    desc: 'Componentes, formulários e tabelas',
    color: 'var(--tech-shadcn)',
    done: 0,
    total: 3
  }, {
    id: 'supabase',
    name: 'Supabase',
    desc: 'PostgreSQL, auth e Row Level Security',
    color: 'var(--tech-supabase)',
    done: 0,
    total: 3
  }],
  sequential: [{
    id: 'react-intro',
    title: 'Introdução a React 19',
    done: true
  }, {
    id: 'react-components',
    title: 'Componentes e Props',
    done: true
  }, {
    id: 'react-hooks',
    title: 'Hooks: useState e useEffect',
    done: true
  }, {
    id: 'react-performance',
    title: 'useCallback e Performance',
    done: false
  }, {
    id: 'react-context',
    title: 'React Context',
    done: false
  }, {
    id: 'nextjs-app-router',
    title: 'App Router explicado',
    done: false,
    locked: true
  }, {
    id: 'nextjs-server-client',
    title: 'Server vs Client Components',
    done: false,
    locked: true
  }, {
    id: 'ts-basics',
    title: 'Tipos básicos e Inferência',
    done: false,
    locked: true
  }],
  lesson: {
    id: 'react-hooks',
    title: 'Hooks: useState e useEffect',
    technology: 'React 19',
    difficulty: 'Iniciante',
    time: 50,
    track: {
      done: 3,
      total: 5
    },
    next: 'useCallback e Performance',
    intro: 'Hooks permitem usar estado e efeitos colaterais em componentes funcionais.',
    sections: [{
      h: 'useState',
      code: "const [count, setCount] = useState(0);\nconst [nome, setNome] = useState('');"
    }, {
      h: 'Atualização baseada no estado anterior',
      code: '// Correto — função atualizadora\nsetCount(prev => prev + 1);'
    }, {
      h: 'useEffect',
      code: 'useEffect(() => {\n  document.title = `Contagem: ${count}`;\n}, [count]);'
    }]
  }
};
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/sketchain-academy/data.js", error: String((e && e.message) || e) }); }

__ds_ns.Badge = __ds_scope.Badge;

__ds_ns.Button = __ds_scope.Button;

__ds_ns.Card = __ds_scope.Card;

__ds_ns.Icon = __ds_scope.Icon;

__ds_ns.Input = __ds_scope.Input;

__ds_ns.ProgressBar = __ds_scope.ProgressBar;

__ds_ns.Tabs = __ds_scope.Tabs;

})();
