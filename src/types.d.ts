interface Parent {
  children: React.ReactNode;
}

interface ClickableParent extends Parent {
  onClick: () => void;
}
