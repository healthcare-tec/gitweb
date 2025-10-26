# Configuração do Web3Forms

O formulário de contato do site usa o **Web3Forms**, um serviço gratuito e open source para envio de formulários.

## Como configurar:

1. Acesse https://web3forms.com
2. Crie uma conta gratuita (pode usar o e-mail cadastro@outlook.com)
3. Após o login, você receberá uma **Access Key**
4. Copie a Access Key

## Onde configurar a Access Key:

Abra o arquivo `src/components/ContactForm.jsx` e substitua a linha:

```javascript
access_key: 'YOUR_WEB3FORMS_ACCESS_KEY',
```

Por:

```javascript
access_key: 'SUA_ACCESS_KEY_AQUI',
```

## Configuração do e-mail de destino:

No painel do Web3Forms, configure o e-mail de destino como: **cadastro@outlook.com**

Todos os formulários enviados pelo site serão encaminhados para este e-mail.

## Recursos do Web3Forms (gratuito):

- ✅ Envio ilimitado de formulários
- ✅ Sem necessidade de backend
- ✅ Proteção contra spam
- ✅ Notificações por e-mail
- ✅ Open source

## Alternativas gratuitas:

Se preferir, você pode usar:
- **Formspree** (https://formspree.io) - 50 envios/mês grátis
- **EmailJS** (https://www.emailjs.com) - 200 envios/mês grátis
- **Netlify Forms** (se hospedar no Netlify) - 100 envios/mês grátis

