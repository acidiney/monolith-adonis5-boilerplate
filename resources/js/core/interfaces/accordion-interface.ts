export interface AccordionChild {
  title: string,
  id: string
}

export interface AccordionGroup {
  title: string
  id: string
  children: AccordionChild[]
}
