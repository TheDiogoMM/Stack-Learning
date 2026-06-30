Horizontal underline tab bar matching the lesson-detail pattern; active tab shows a terracota underline and bold terracota label.

```jsx
<Tabs
  tabs={[{ id: 'conteudo', label: 'Conteúdo' }, { id: 'lab', label: 'Mini-Lab' }, { id: 'recursos', label: 'Recursos' }]}
  value={tab}
  onChange={setTab}
/>
```

Controlled via `value` + `onChange`, or uncontrolled (defaults to first tab).
