Single-line text field on the dark surface; border turns terracota on focus. Optional label and leading icon.

```jsx
<Input label="Email" type="email" placeholder="seu@email.com" />
<Input icon={<Icon name="search" size={16} />} placeholder="Buscar aulas" />
```

`label` renders a tied `<label>`; `icon` slots a node at the left. All native input props pass through.
