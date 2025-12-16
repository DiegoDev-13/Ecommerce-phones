export const About = () => {
  return (
    <div className="space-y-5">
        <h1 className="text-center text-4xl font-semibold tracking-tight mb-5">Nuestra Empresa</h1>

        <img src="https://plus.unsplash.com/premium_photo-1682716270464-9a91cbbcf3b7?q=80&w=871&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="imagen de fondo" className="h-125 w-full object-cover" />

        <div className="flex flex-col gap-4 tracking-tighter leading-7 text-sm font-medium text-slate-800">
          <p>
            CelularesBaratos es una tienda en linea que se dedica a la venta de celulares, fundada en 2022. Nuestro objetivo es ofrecer a nuestros clientes la mejor calidad y precio en celulares. Contamos con un equipo de profecionales que se encargan de seleccionar los mejores productos para ti.
          </p>

          <p>
            En CelularesBaratos podras encontrar una amplia variedad de celulares de las mejores marcas. Ademas, contamos con promociones y descuentos exclucivos para que puedas comprar tu celular al mejor precio.
          </p>

          <h2 className="text-3xl font-semibold tracking-tight mt-8 mb-4">¡No esperes mas y compra tu celular en CelularesBaratos!</h2>
          <p>
            Para mas imformacion, no olvides en ponerte en contacto con nosotros, a traves de nuestro correo electronico <a href="mailto:correo@celularesbaratos.com">correo@celularesbaratos.com</a> o llamando al <a href="tel:3333333">3333333</a>
          </p>
        </div>
    </div>
  )
}