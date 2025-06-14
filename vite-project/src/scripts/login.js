document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('loginForm');
    const inputs = document.querySelectorAll('.input-field');
    const usernameInput = document.getElementById('username');
    const passwordInput = document.getElementById('password');
    const loginButton = document.querySelector('.login-button');
    
    // efeito de foco nos inputs
    inputs.forEach(input => {
      input.addEventListener('focus', function() {
        this.parentElement.classList.add('focused');
      });
      
      input.addEventListener('blur', function() {
        this.parentElement.classList.remove('focused');
      });
    });
    
    // submit do formulário
    form.addEventListener('submit', function(e) {
      e.preventDefault();
      
      const usuario = usernameInput.value.trim();
      const senha = passwordInput.value.trim();
      
      // Validação básica
      if (!usuario || !senha) {
        showMessage('Por favor, preencha todos os campos.', 'error');
        return;
      }
      
      // Simulação de autenticação
      authenticateUser(usuario, senha);
    });
    
    function authenticateUser(usuario, senha) {
      // Desabilitar botão e mostrar loading
      loginButton.textContent = 'ENTRANDO...';
      loginButton.disabled = true;
      
      // Simulação de chamada para API
      setTimeout(() => {
        // Credenciais de exemplo
        const validCredentials = [
          { username: 'admin', password: 'admin123' },
          { username: 'usuario', password: '123456' },
          { username: 'demo', password: 'demo' }
        ];
        
        const isValid = validCredentials.some(
          cred => cred.username === usuario && cred.password === senha
        );
        
        if (isValid) {
          // autenticação no localStorage
          localStorage.setItem('isAuthenticated', 'true');
          localStorage.setItem('username', usuario);
          localStorage.setItem('loginTime', new Date().toISOString());
          
          showMessage('Login realizado com sucesso!', 'success');
          
          // Redirecionar para o dashboard após um breve delay
          setTimeout(() => {
            window.location.href = 'src/pages/dashboard.html';
          }, 1000);
        } else {
          showMessage('Usuário ou senha incorretos.', 'error');
          loginButton.textContent = 'LOGIN';
          loginButton.disabled = false;
        }
      }, 1500);
    }
    
    function showMessage(message, type) {
      // Remove mensagem anterior se existir
      const existingMessage = document.querySelector('.message');
      if (existingMessage) {
        existingMessage.remove();
      }
      
      // Criar elemento de mensagem
      const messageElement = document.createElement('div');
      messageElement.className = `message message-${type}`;
      messageElement.textContent = message;
      
      // Adicionar estilos
      messageElement.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        padding: 12px 20px;
        border-radius: 8px;
        font-weight: 500;
        z-index: 1000;
        animation: slideIn 0.3s ease-out;
        ${type === 'success' 
          ? 'background: #d4edda; color: #155724; border: 1px solid #c3e6cb;' 
          : 'background: #f8d7da; color: #721c24; border: 1px solid #f5c6cb;'
        }
      `;
      
      // Adicionar ao DOM
      document.body.appendChild(messageElement);
      
      // Remover após 4 segundos
      setTimeout(() => {
        messageElement.style.animation = 'slideOut 0.3s ease-out';
        setTimeout(() => {
          if (messageElement.parentNode) {
            messageElement.remove();
          }
        }, 300);
      }, 4000);
    }
    
    // Adicionar animações CSS
    const style = document.createElement('style');
    style.textContent = `
      @keyframes slideIn {
        from {
          transform: translateX(100%);
          opacity: 0;
        }
        to {
          transform: translateX(0);
          opacity: 1;
        }
      }
      
      @keyframes slideOut {
        from {
          transform: translateX(0);
          opacity: 1;
        }
        to {
          transform: translateX(100%);
          opacity: 0;
        }
      }
    `;
    document.head.appendChild(style);
    
    // Verificar se já está autenticado
    if (localStorage.getItem('isAuthenticated') === 'true') {
      const loginTime = new Date(localStorage.getItem('loginTime'));
      const now = new Date();
      const hoursDiff = (now - loginTime) / (1000 * 60 * 60);
      
      // Se logado há menos de 24 horas, redirecionar para dashboard
      if (hoursDiff < 24) {
        window.location.href = 'src/pages/dashboard.html';
      } else {
        // Limpar dados expirados
        localStorage.removeItem('isAuthenticated');
        localStorage.removeItem('username');
        localStorage.removeItem('loginTime');
      }
    }
  });