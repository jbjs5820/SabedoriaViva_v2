export function Footer() {
  return (
    <footer className="bg-[#1D3557] text-white py-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center md:text-left">
          <div>
            <h5 className="font-semibold mb-4">Sobre Nós</h5>
            <p className="text-sm opacity-80">
              Construindo pontes entre gerações através da tecnologia e da sabedoria compartilhada.
            </p>
          </div>
          <div>
            <h5 className="font-semibold mb-4">Links Úteis</h5>
            <ul className="space-y-2">
              <li><a href="/sobre" className="text-sm opacity-80 hover:opacity-100">Sobre Nós</a></li>
              <li><a href="/contato" className="text-sm opacity-80 hover:opacity-100">Contato</a></li>
              <li><a href="/privacidade" className="text-sm opacity-80 hover:opacity-100">Política de Privacidade</a></li>
            </ul>
          </div>
          <div>
            <h5 className="font-semibold mb-4">Contato</h5>
            <p className="text-sm opacity-80">
              Email: contato@sabedoriaviva.pt<br />
              Telefone: +351 123 456 789
            </p>
          </div>
        </div>
        <div className="text-center mt-8 pt-8 border-t border-white/20">
          <p className="text-sm opacity-80">© 2024 Sabedoria Viva. Todos os direitos reservados.</p>
        </div>
      </div>
    </footer>
  );
}