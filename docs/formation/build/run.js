const which = process.argv[2];
(async () => {
  if (!which || which === 'agent') await require('./agent')(__dirname + '/out/Formation_Agent.pptx');
  if (!which || which === 'manager') await require('./manager')(__dirname + '/out/Formation_Manager.pptx');
  console.log('ok');
})().catch(e => { console.error(e); process.exit(1); });
