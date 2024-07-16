export const Button = ({ children, textOnly, className, ...props }) => {
  let cssSelector = textOnly ? 'text-button' : 'button';
  cssSelector += className;

  return (
    <button className={cssSelector} {...props}>
      {children}
    </button>
  );
};
