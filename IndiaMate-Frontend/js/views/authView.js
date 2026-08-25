// js/views/authView.js
export function viewAuth(authMode = 'login') {
  const isLogin = authMode === 'login';

  return `
    <div style="padding: 20px 10px; text-align: center;">
      <div style="font-size: 2.5rem; margin-bottom: 8px;">🇮🇳</div>
      <h2 style="margin: 0 0 4px 0; font-family: 'Fraunces', serif; color: var(--indigo);">${isLogin ? 'Welcome Back' : 'Create an Account'}</h2>
      <p style="margin: 0 0 24px 0; color: var(--indigo-soft); font-size: 0.85rem;">
        ${isLogin ? 'Log in to access your travel wallet & verified routes' : 'Sign up to start scam-free travel in India'}
      </p>

      <form id="authForm" style="display: flex; flex-direction: column; gap: 14px; text-align: left;">
        ${!isLogin ? `
          <div>
            <label style="font-size: 0.8rem; font-weight: 600; color: var(--indigo);">Full Name</label>
            <input type="text" id="authName" required placeholder="e.g. Parmanand Sahu" style="width: 100%; padding: 12px; border-radius: 8px; border: 1px solid var(--line); font-size: 0.95rem; margin-top: 4px; background: var(--paper); color: var(--indigo);" />
          </div>
        ` : ''}

        <div>
          <label style="font-size: 0.8rem; font-weight: 600; color: var(--indigo);">Email Address</label>
          <input type="email" id="authEmail" required placeholder="name@example.com" style="width: 100%; padding: 12px; border-radius: 8px; border: 1px solid var(--line); font-size: 0.95rem; margin-top: 4px; background: var(--paper); color: var(--indigo);" />
        </div>

        <div>
          <label style="font-size: 0.8rem; font-weight: 600; color: var(--indigo);">Password</label>
          <input type="password" id="authPassword" required placeholder="••••••••" style="width: 100%; padding: 12px; border-radius: 8px; border: 1px solid var(--line); font-size: 0.95rem; margin-top: 4px; background: var(--paper); color: var(--indigo);" />
        </div>

        <button type="submit" id="authSubmitBtn" style="width: 100%; background: var(--madder); color: var(--paper); border: none; padding: 14px; border-radius: 10px; font-weight: bold; font-size: 1rem; cursor: pointer; margin-top: 6px;">
          ${isLogin ? 'Log In to IndiaMate' : 'Create Free Account'}
        </button>
      </form>

      <div style="margin-top: 20px; font-size: 0.85rem;">
        ${isLogin 
          ? `Don't have an account? <a href="#" id="toggleAuthMode" data-mode="signup" style="color: var(--indigo); font-weight: bold; text-decoration: underline;">Sign Up</a>`
          : `Already registered? <a href="#" id="toggleAuthMode" data-mode="login" style="color: var(--indigo); font-weight: bold; text-decoration: underline;">Log In</a>`
        }
      </div>
    </div>
  `;
}