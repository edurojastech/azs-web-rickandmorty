import logo from '../../assets/logo.png'

export default function Header ({ children }) {
  return (
    <header>
      <div className="container-fluid d-flex flex-column justify-content-center">
        <img src={logo} alt="Logo" className='logo' />
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            gap: 10,
          }}
        >
          { children }
        </div>
      </div>

     
    </header>
  )
}