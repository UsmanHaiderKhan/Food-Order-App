export default function Button({children, textOnly, className, ...props}) {
    let cssClasses = textOnly ? 'button-text' : 'button';
    cssClasses += '' + className;
    return(
        <button className={cssClasses} {...props}>{children}</button>
    );
}
