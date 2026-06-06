const fs = require('fs');

let css = fs.readFileSync('src/pages/BattlePage.css', 'utf8');

// Backgrounds
css = css.replace(/linear-gradient\(180deg, #0a0e1a 0%, #0f1628 40%, #121a2e 100%\)/g, 'linear-gradient(180deg, #fdfbfe 0%, #f3f0ff 40%, #e9e5ff 100%)');
css = css.replace(/rgba\(255,255,255,0\.015\)/g, 'rgba(0,0,0,0.03)');

// Common text
css = css.replace(/color: #fff/g, 'color: #0f172a');
css = css.replace(/color: rgba\(255,255,255,0\.45\)/g, 'color: rgba(0,0,0,0.6)');
css = css.replace(/color: rgba\(255,255,255,0\.7\)/g, 'color: rgba(0,0,0,0.7)');
css = css.replace(/color: rgba\(255,255,255,0\.5\)/g, 'color: rgba(0,0,0,0.6)');
css = css.replace(/color: rgba\(255,255,255,0\.4\)/g, 'color: rgba(0,0,0,0.6)');
css = css.replace(/color: rgba\(255,255,255,0\.35\)/g, 'color: rgba(0,0,0,0.5)');
css = css.replace(/color: rgba\(255,255,255,0\.3\)/g, 'color: rgba(0,0,0,0.5)');
css = css.replace(/color: rgba\(255,255,255,0\.25\)/g, 'color: rgba(0,0,0,0.5)');
css = css.replace(/color: rgba\(255,255,255,0\.55\)/g, 'color: rgba(0,0,0,0.7)');
css = css.replace(/color: rgba\(255,255,255,0\.8\)/g, 'color: #0f172a');

// Borders and backgrounds
css = css.replace(/border: 1px solid rgba\(255,255,255,0\.1\)/g, 'border: 1px solid rgba(0,0,0,0.1)');
css = css.replace(/border: 1px solid rgba\(255,255,255,0\.08\)/g, 'border: 1px solid rgba(0,0,0,0.1)');
css = css.replace(/border: 1px solid rgba\(255,255,255,0\.06\)/g, 'border: 1px solid rgba(0,0,0,0.05)');
css = css.replace(/border-bottom: 1px solid rgba\(255,255,255,0\.06\)/g, 'border-bottom: 1px solid rgba(0,0,0,0.05)');
css = css.replace(/border-bottom: 1px solid rgba\(255,255,255,0\.04\)/g, 'border-bottom: 1px solid rgba(0,0,0,0.05)');

css = css.replace(/background: rgba\(255,255,255,0\.06\)/g, 'background: rgba(255,255,255,0.8)');
css = css.replace(/background: rgba\(255,255,255,0\.04\)/g, 'background: rgba(255,255,255,0.8)');
css = css.replace(/background: rgba\(255,255,255,0\.03\)/g, 'background: rgba(255,255,255,0.6)');
css = css.replace(/background: rgba\(255,255,255,0\.08\)/g, 'background: rgba(255,255,255,0.6)');
css = css.replace(/background: rgba\(0,0,0,0\.25\)/g, 'background: rgba(255,255,255,0.6)');

// Restore white text for solid buttons
css = css.replace(/\.btn-start-battle \{([\s\S]*?)color: #0f172a;/g, '.btn-start-battle {$1color: #fff;');
css = css.replace(/\.btn-secondary:hover \{([\s\S]*?)color: #0f172a;/g, '.btn-secondary:hover {$1color: #0f172a;');

// Health bar
css = css.replace(/color: rgba\(255,255,255,0\.6\)/g, 'color: rgba(0,0,0,0.6)');

fs.writeFileSync('src/pages/BattlePage.css', css);

// BattlePage.jsx styles
let jsx = fs.readFileSync('src/pages/BattlePage.jsx', 'utf8');
jsx = jsx.replace(/background: "rgba\\(255,255,255,0\\.04\\)"/g, 'background: "rgba(255,255,255,0.6)"');
jsx = jsx.replace(/border: "1px solid rgba\\(255,255,255,0\\.08\\)"/g, 'border: "1px solid rgba(0,0,0,0.08)"');
jsx = jsx.replace(/color: "rgba\\(255,255,255,0\\.3\\)"/g, 'color: "rgba(0,0,0,0.5)"');
jsx = jsx.replace(/color: "rgba\\(255,255,255,0\\.55\\)"/g, 'color: "rgba(0,0,0,0.7)"');
jsx = jsx.replace(/color: "rgba\\(255,255,255,0\\.8\\)"/g, 'color: "#0f172a"');
jsx = jsx.replace(/"1px solid rgba\\(255,255,255,0\\.04\\)"/g, '"1px solid rgba(0,0,0,0.05)"');

fs.writeFileSync('src/pages/BattlePage.jsx', jsx);

console.log("Theme updated successfully.");
