// Ajusta o projeto Android gerado: permissoes, icone e plugin nativo de roteamento de audio
const fs=require('fs'),path=require('path');
const res=path.join('android','app','src','main','res'),man=path.join('android','app','src','main','AndroidManifest.xml');
let m=fs.readFileSync(man,'utf8');
for(const p of['RECORD_AUDIO','MODIFY_AUDIO_SETTINGS','WAKE_LOCK','BLUETOOTH','BLUETOOTH_CONNECT']){
  if(!m.includes('android.permission.'+p))m=m.replace('</manifest>','    <uses-permission android:name="android.permission.'+p+'" />\n</manifest>');
}
fs.writeFileSync(man,m);
const any=path.join(res,'mipmap-anydpi-v26');
if(fs.existsSync(any))fs.rmSync(any,{recursive:true,force:true});
for(const d of fs.readdirSync(res).filter(x=>x.startsWith('mipmap-'))){
  for(const n of['ic_launcher.png','ic_launcher_round.png','ic_launcher_foreground.png'])fs.copyFileSync('icon.png',path.join(res,d,n));
}
const jd=path.join('android','app','src','main','java','com','caveirax','micbooster');
fs.mkdirSync(jd,{recursive:true});
for(const f of['MainActivity.java','AudioRoutePlugin.java'])fs.copyFileSync(path.join('native',f),path.join(jd,f));
console.log('Projeto Android preparado.');
