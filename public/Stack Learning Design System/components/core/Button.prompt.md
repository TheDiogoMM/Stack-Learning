Primary action control in the Stack Learning brand; terracota fill by default, with secondary/outline/ghost/success variants and optional leading/trailing icons.

```jsx
<Button>Entrar</Button>
<Button variant="success" iconLeft="check">Concluída</Button>
<Button variant="secondary" iconRight="arrow-right">Ir para próxima</Button>
<Button variant="outline" size="sm">Salvar</Button>
```

Variants: `primary` (terracota), `secondary` (gold outline), `outline` (neutral), `ghost`, `success` (green). Sizes `sm | md | lg`. `iconLeft`/`iconRight` take an icon-library name. Hover dims fills / tints outlines; disabled = 0.5 opacity.
