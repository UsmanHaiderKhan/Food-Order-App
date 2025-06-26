import logoImg from '../assets/logo.png';
export default function Header() {
  return (
    <header id="main-header">
      <div id="title">
          <img src={logoImg} alt=""/>
          <h1>Order Food</h1>
      </div>
        <nav>
            <button>Cart (0)</button>
        </nav>
    </header>
  );
}
