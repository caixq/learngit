document.write ('<table >');
var parent = window.top; 
var examcount = parent.$("#jiakao-data-totalqn").val();
for ( ii = 1; ii <= examcount; ii++) 
{
  if ((ii%10)==1) {document.write ('<tr>');}

  document.write ('<td id="examIndex'+ii+'" >'+ii+'</td>');
  if ((ii%10)==0) {document.write ('</tr>');}
  
}
ii=examcount;
document.write ('</tr></table>');




