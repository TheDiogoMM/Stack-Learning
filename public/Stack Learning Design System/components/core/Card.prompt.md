Base dark surface container — #1A1A1A fill, hairline border, 8px radius. Optional `accent` left-border (the track-card pattern) and `hover` lift.

```jsx
<Card padding={20}>…</Card>
<Card hover accent="var(--tech-react)" onClick={open}>React 19</Card>
```

`accent` takes a CSS color and draws the 4px colored left edge; `hover` enables `scale(1.02)` + shadow on pointer; `padding` is px or any CSS value.
