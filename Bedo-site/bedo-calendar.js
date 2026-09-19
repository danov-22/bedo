(function(){
  'use strict';
  const key=d=>`${d.getFullYear()}-${d.getMonth()+1}-${d.getDate()}`;
  async function importEvents(){
    const token=await window.BedoAuth.requestCalendarAccess(),from=new Date(),to=new Date(from);to.setMonth(to.getMonth()+3);
    const query=new URLSearchParams({singleEvents:'true',orderBy:'startTime',showDeleted:'false',timeMin:from.toISOString(),timeMax:to.toISOString(),maxResults:'2500'});
    const response=await fetch('https://www.googleapis.com/calendar/v3/calendars/primary/events?'+query,{headers:{Authorization:'Bearer '+token},signal:AbortSignal.timeout(20000)});
    if(!response.ok){const body=await response.json().catch(()=>({}));throw Error(body.error?.message||'Google Calendar could not be read.');}
    const data=await response.json(),existing=JSON.parse(localStorage.getItem('bedo-blocks')||'[]'),ids=new Set(existing.map(block=>block.googleEventId).filter(Boolean));let imported=0,skipped=0;
    for(const event of data.items||[]){
      if(event.status==='cancelled'||!event.start?.dateTime||!event.end?.dateTime||ids.has(event.id)){skipped++;continue;}
      const start=new Date(event.start.dateTime),end=new Date(event.end.dateTime),duration=(end-start)/3600000;if(!Number.isFinite(duration)||duration<=0||duration>24||key(start)!==key(end)){skipped++;continue;}
      existing.push({id:crypto.randomUUID?crypto.randomUUID():`gcal-${Date.now()}-${imported}`,googleEventId:event.id,title:event.summary||'Google Calendar event',date:key(start),start:start.getHours()+start.getMinutes()/60,duration,category:'Google Calendar',completed:false,source:'google-calendar'});ids.add(event.id);imported++;
    }
    const profile=JSON.parse(localStorage.getItem('bedo-profile')||'{}'),categories=profile.categories||['Personal','Work','Wellness','Study'];if(!categories.includes('Google Calendar'))categories.push('Google Calendar');profile.categories=categories;profile.categoryColors={...(profile.categoryColors||{}),'Google Calendar':profile.categoryColors?.['Google Calendar']||'#165bdf'};
    localStorage.setItem('bedo-profile',JSON.stringify(profile));localStorage.setItem('bedo-blocks',JSON.stringify(existing));localStorage.setItem('bedo-calendar-choice','import');window.BedoSync?.changed();return {imported,skipped};
  }
  window.BedoCalendar={importEvents};
})();
