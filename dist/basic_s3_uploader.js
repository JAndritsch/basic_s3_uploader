!function(a,b){"use strict";function c(){var a=Error.apply(this,arguments);this.message=a.message,this.stack=a.stack}function d(){var a=Error.apply(this,arguments);this.message=a.message,this.stack=a.stack}function e(){var a=Error.apply(this,arguments);this.message=a.message,this.stack=a.stack}function f(a){for(var b=a.length,c=new Uint8Array(b),d=0;b>d;d++){var e=a.charCodeAt(d);if(e>>>8)throw new Error("Wide characters are not allowed");c[d]=e}return c}function g(a){var b,c=[],d=a.length;for(1&d&&(a="0"+a,d++),b=0;d>b;b+=2)c.push(parseInt(a.substr(b,2),16));return new Uint8Array(c)}function h(a){return f(atob(a))}function i(a){for(var b="",c=0;c<a.length;c++)b+=String.fromCharCode(a[c]);return b}function j(a){for(var b="",c=0;c<a.length;c++){var d=(255&a[c]).toString(16);d.length<2&&(b+="0"),b+=d}return b}function k(a){return btoa(i(a))}function l(a){return a-=1,a|=a>>>1,a|=a>>>2,a|=a>>>4,a|=a>>>8,a|=a>>>16,a+=1}function m(a){return"number"==typeof a}function n(a){return"string"==typeof a}function o(a){return a instanceof ArrayBuffer}function p(a){return a instanceof Uint8Array}function q(a){return a instanceof Int8Array||a instanceof Uint8Array||a instanceof Int16Array||a instanceof Uint16Array||a instanceof Int32Array||a instanceof Uint32Array||a instanceof Float32Array||a instanceof Float64Array}function r(a,b,c){"use asm";var d=0,e=0,f=0,g=0,h=0,i=0,j=0,k=0,l=0,m=0,n=0,o=0,p=0,q=0,s=0,t=0;var u=0;var v=0,w=0,x=0,y=0,z=0,A=0,B=0,C=0;var D=0,E=0,F=0,G=0,H=0,I=0,J=0,K=0,L=0,M=0,N=0,O=0,P=0,Q=0,R=0,S=0,T=0,U=0,V=0,W=0,X=0,Y=0,Z=0,$=0,_=0,ab=0,bb=0,cb=0,db=0,eb=0,fb=0,gb=0,hb=0,ib=0,jb=0,kb=0,lb=0,mb=0,nb=0,ob=0,pb=0,qb=0,rb=0,sb=0,tb=0,ub=0,vb=0,wb=0,xb=0,yb=0,zb=0,Ab=0,Bb=0,Cb=0,Db=0,Eb=0,Fb=0,Gb=0,Hb=0,Ib=0,Jb=0,Kb=0,Lb=0,Mb=0,Nb=0,Ob=0,Pb=0,Qb=0,Rb=0,Sb=0,Tb=0,Ub=0,Vb=0,Wb=0,Xb=0,Yb=0,Zb=0,$b=0,_b=0,ac=0,bc=0,cc=0,dc=0,ec=0,fc=0,gc=0,hc=0,ic=0,jc=0,kc=0,lc=0,mc=0,nc=0,oc=0,pc=0,qc=0,rc=0,sc=0,tc=0,uc=0,vc=0,wc=0,xc=0,yc=0,zc=0,Ac=0,Bc=0,Cc=0,Dc=0,Ec=0,Fc=0,Gc=0,Hc=0,Ic=0,Jc=0,Kc=0,Lc=0,Mc=0,Nc=0,Oc=0,Pc=0,Qc=0,Rc=0,Sc=0,Tc=0,Uc=0,Vc=0,Wc=0,Xc=0,Yc=0,Zc=0,$c=0,_c=0,ad=0,bd=0,cd=0,dd=0,ed=0,fd=0,gd=0,hd=0,id=0,jd=0,kd=0,ld=0,md=0,nd=0,od=0,pd=0,qd=0,rd=0,sd=0,td=0,ud=0,vd=0,wd=0,xd=0,yd=0,zd=0,Ad=0,Bd=0,Cd=0,Dd=0,Ed=0,Fd=0,Gd=0,Hd=0,Id=0,Jd=0,Kd=0,Ld=0,Md=0,Nd=0,Od=0,Pd=0,Qd=0,Rd=0,Sd=0,Td=0,Ud=0,Vd=0,Wd=0,Xd=0,Yd=0,Zd=0,$d=0,_d=0,ae=0,be=0,ce=0,de=0,ee=0,fe=0,ge=0,he=0,ie=0,je=0,ke=0,le=0,me=0,ne=0,oe=0,pe=0,qe=0,re=0,se=0,te=0,ue=0,ve=0,we=0,xe=0,ye=0,ze=0,Ae=0,Be=0,Ce=0,De=0,Ee=0,Fe=0,Ge=0,He=0,Ie=0,Je=0,Ke=0,Le=0,Me=0,Ne=0,Oe=0,Pe=0,Qe=0,Re=0,Se=0,Te=0,Ue=0,Ve=0,We=0,Xe=0,Ye=0,Ze=0,$e=0;var _e=new a.Uint8Array(c);function af(){var yf=0;T=D^_e[yf|Q]^1;U=E^_e[yf|R];V=F^_e[yf|S];W=G^_e[yf|P];X=H^T;Y=I^U;Z=J^V;$=K^W;_=L^X;ab=M^Y;bb=N^Z;cb=O^$;db=P^_;eb=Q^ab;fb=R^bb;gb=S^cb;hb=T^_e[yf|eb]^2;ib=U^_e[yf|fb];jb=V^_e[yf|gb];kb=W^_e[yf|db];lb=X^hb;mb=Y^ib;nb=Z^jb;ob=$^kb;pb=_^lb;qb=ab^mb;rb=bb^nb;sb=cb^ob;tb=db^pb;ub=eb^qb;vb=fb^rb;wb=gb^sb;xb=hb^_e[yf|ub]^4;yb=ib^_e[yf|vb];zb=jb^_e[yf|wb];Ab=kb^_e[yf|tb];Bb=lb^xb;Cb=mb^yb;Db=nb^zb;Eb=ob^Ab;Fb=pb^Bb;Gb=qb^Cb;Hb=rb^Db;Ib=sb^Eb;Jb=tb^Fb;Kb=ub^Gb;Lb=vb^Hb;Mb=wb^Ib;Nb=xb^_e[yf|Kb]^8;Ob=yb^_e[yf|Lb];Pb=zb^_e[yf|Mb];Qb=Ab^_e[yf|Jb];Rb=Bb^Nb;Sb=Cb^Ob;Tb=Db^Pb;Ub=Eb^Qb;Vb=Fb^Rb;Wb=Gb^Sb;Xb=Hb^Tb;Yb=Ib^Ub;Zb=Jb^Vb;$b=Kb^Wb;_b=Lb^Xb;ac=Mb^Yb;bc=Nb^_e[yf|$b]^16;cc=Ob^_e[yf|_b];dc=Pb^_e[yf|ac];ec=Qb^_e[yf|Zb];fc=Rb^bc;gc=Sb^cc;hc=Tb^dc;ic=Ub^ec;jc=Vb^fc;kc=Wb^gc;lc=Xb^hc;mc=Yb^ic;nc=Zb^jc;oc=$b^kc;pc=_b^lc;qc=ac^mc;rc=bc^_e[yf|oc]^32;sc=cc^_e[yf|pc];tc=dc^_e[yf|qc];uc=ec^_e[yf|nc];vc=fc^rc;wc=gc^sc;xc=hc^tc;yc=ic^uc;zc=jc^vc;Ac=kc^wc;Bc=lc^xc;Cc=mc^yc;Dc=nc^zc;Ec=oc^Ac;Fc=pc^Bc;Gc=qc^Cc;Hc=rc^_e[yf|Ec]^64;Ic=sc^_e[yf|Fc];Jc=tc^_e[yf|Gc];Kc=uc^_e[yf|Dc];Lc=vc^Hc;Mc=wc^Ic;Nc=xc^Jc;Oc=yc^Kc;Pc=zc^Lc;Qc=Ac^Mc;Rc=Bc^Nc;Sc=Cc^Oc;Tc=Dc^Pc;Uc=Ec^Qc;Vc=Fc^Rc;Wc=Gc^Sc;Xc=Hc^_e[yf|Uc]^128;Yc=Ic^_e[yf|Vc];Zc=Jc^_e[yf|Wc];$c=Kc^_e[yf|Tc];_c=Lc^Xc;ad=Mc^Yc;bd=Nc^Zc;cd=Oc^$c;dd=Pc^_c;ed=Qc^ad;fd=Rc^bd;gd=Sc^cd;hd=Tc^dd;id=Uc^ed;jd=Vc^fd;kd=Wc^gd;ld=Xc^_e[yf|id]^27;md=Yc^_e[yf|jd];nd=Zc^_e[yf|kd];od=$c^_e[yf|hd];pd=_c^ld;qd=ad^md;rd=bd^nd;sd=cd^od;td=dd^pd;ud=ed^qd;vd=fd^rd;wd=gd^sd;xd=hd^td;yd=id^ud;zd=jd^vd;Ad=kd^wd;Bd=ld^_e[yf|yd]^54;Cd=md^_e[yf|zd];Dd=nd^_e[yf|Ad];Ed=od^_e[yf|xd];Fd=pd^Bd;Gd=qd^Cd;Hd=rd^Dd;Id=sd^Ed;Jd=td^Fd;Kd=ud^Gd;Ld=vd^Hd;Md=wd^Id;Nd=xd^Jd;Od=yd^Kd;Pd=zd^Ld;Qd=Ad^Md}function bf(){var yf=0;hb=D^_e[yf|eb]^1;ib=E^_e[yf|fb];jb=F^_e[yf|gb];kb=G^_e[yf|db];lb=H^hb;mb=I^ib;nb=J^jb;ob=K^kb;pb=L^lb;qb=M^mb;rb=N^nb;sb=O^ob;tb=P^pb;ub=Q^qb;vb=R^rb;wb=S^sb;xb=T^_e[yf|tb];yb=U^_e[yf|ub];zb=V^_e[yf|vb];Ab=W^_e[yf|wb];Bb=X^xb;Cb=Y^yb;Db=Z^zb;Eb=$^Ab;Fb=_^Bb;Gb=ab^Cb;Hb=bb^Db;Ib=cb^Eb;Jb=db^Fb;Kb=eb^Gb;Lb=fb^Hb;Mb=gb^Ib;Nb=hb^_e[yf|Kb]^2;Ob=ib^_e[yf|Lb];Pb=jb^_e[yf|Mb];Qb=kb^_e[yf|Jb];Rb=lb^Nb;Sb=mb^Ob;Tb=nb^Pb;Ub=ob^Qb;Vb=pb^Rb;Wb=qb^Sb;Xb=rb^Tb;Yb=sb^Ub;Zb=tb^Vb;$b=ub^Wb;_b=vb^Xb;ac=wb^Yb;bc=xb^_e[yf|Zb];cc=yb^_e[yf|$b];dc=zb^_e[yf|_b];ec=Ab^_e[yf|ac];fc=Bb^bc;gc=Cb^cc;hc=Db^dc;ic=Eb^ec;jc=Fb^fc;kc=Gb^gc;lc=Hb^hc;mc=Ib^ic;nc=Jb^jc;oc=Kb^kc;pc=Lb^lc;qc=Mb^mc;rc=Nb^_e[yf|oc]^4;sc=Ob^_e[yf|pc];tc=Pb^_e[yf|qc];uc=Qb^_e[yf|nc];vc=Rb^rc;wc=Sb^sc;xc=Tb^tc;yc=Ub^uc;zc=Vb^vc;Ac=Wb^wc;Bc=Xb^xc;Cc=Yb^yc;Dc=Zb^zc;Ec=$b^Ac;Fc=_b^Bc;Gc=ac^Cc;Hc=bc^_e[yf|Dc];Ic=cc^_e[yf|Ec];Jc=dc^_e[yf|Fc];Kc=ec^_e[yf|Gc];Lc=fc^Hc;Mc=gc^Ic;Nc=hc^Jc;Oc=ic^Kc;Pc=jc^Lc;Qc=kc^Mc;Rc=lc^Nc;Sc=mc^Oc;Tc=nc^Pc;Uc=oc^Qc;Vc=pc^Rc;Wc=qc^Sc;Xc=rc^_e[yf|Uc]^8;Yc=sc^_e[yf|Vc];Zc=tc^_e[yf|Wc];$c=uc^_e[yf|Tc];_c=vc^Xc;ad=wc^Yc;bd=xc^Zc;cd=yc^$c;dd=zc^_c;ed=Ac^ad;fd=Bc^bd;gd=Cc^cd;hd=Dc^dd;id=Ec^ed;jd=Fc^fd;kd=Gc^gd;ld=Hc^_e[yf|hd];md=Ic^_e[yf|id];nd=Jc^_e[yf|jd];od=Kc^_e[yf|kd];pd=Lc^ld;qd=Mc^md;rd=Nc^nd;sd=Oc^od;td=Pc^pd;ud=Qc^qd;vd=Rc^rd;wd=Sc^sd;xd=Tc^td;yd=Uc^ud;zd=Vc^vd;Ad=Wc^wd;Bd=Xc^_e[yf|yd]^16;Cd=Yc^_e[yf|zd];Dd=Zc^_e[yf|Ad];Ed=$c^_e[yf|xd];Fd=_c^Bd;Gd=ad^Cd;Hd=bd^Dd;Id=cd^Ed;Jd=dd^Fd;Kd=ed^Gd;Ld=fd^Hd;Md=gd^Id;Nd=hd^Jd;Od=id^Kd;Pd=jd^Ld;Qd=kd^Md;Rd=ld^_e[yf|Nd];Sd=md^_e[yf|Od];Td=nd^_e[yf|Pd];Ud=od^_e[yf|Qd];Vd=pd^Rd;Wd=qd^Sd;Xd=rd^Td;Yd=sd^Ud;Zd=td^Vd;$d=ud^Wd;_d=vd^Xd;ae=wd^Yd;be=xd^Zd;ce=yd^$d;de=zd^_d;ee=Ad^ae;fe=Bd^_e[yf|ce]^32;ge=Cd^_e[yf|de];he=Dd^_e[yf|ee];ie=Ed^_e[yf|be];je=Fd^fe;ke=Gd^ge;le=Hd^he;me=Id^ie;ne=Jd^je;oe=Kd^ke;pe=Ld^le;qe=Md^me;re=Nd^ne;se=Od^oe;te=Pd^pe;ue=Qd^qe;ve=Rd^_e[yf|re];we=Sd^_e[yf|se];xe=Td^_e[yf|te];ye=Ud^_e[yf|ue];ze=Vd^ve;Ae=Wd^we;Be=Xd^xe;Ce=Yd^ye;De=Zd^ze;Ee=$d^Ae;Fe=_d^Be;Ge=ae^Ce;He=be^De;Ie=ce^Ee;Je=de^Fe;Ke=ee^Ge;Le=fe^_e[yf|Ie]^64;Me=ge^_e[yf|Je];Ne=he^_e[yf|Ke];Oe=ie^_e[yf|He];Pe=je^Le;Qe=ke^Me;Re=le^Ne;Se=me^Oe;Te=ne^Pe;Ue=oe^Qe;Ve=pe^Re;We=qe^Se;Xe=re^Te;Ye=se^Ue;Ze=te^Ve;$e=ue^We}function cf(yf,zf,Af,Bf,Cf,Df,Ef,Ff,Gf,Hf,If,Jf,Kf,Lf,Mf,Nf){yf=yf|0;zf=zf|0;Af=Af|0;Bf=Bf|0;Cf=Cf|0;Df=Df|0;Ef=Ef|0;Ff=Ff|0;Gf=Gf|0;Hf=Hf|0;If=If|0;Jf=Jf|0;Kf=Kf|0;Lf=Lf|0;Mf=Mf|0;Nf=Nf|0;var Of=0,Pf=0,Qf=0,Rf=0,Sf=0,Tf=0,Uf=0,Vf=0,Wf=0,Xf=0,Yf=0,Zf=0,$f=0,_f=0,ag=0,bg=0,cg=0,dg=512,eg=768;yf=yf^D;zf=zf^E;Af=Af^F;Bf=Bf^G;Cf=Cf^H;Df=Df^I;Ef=Ef^J;Ff=Ff^K;Gf=Gf^L;Hf=Hf^M;If=If^N;Jf=Jf^O;Kf=Kf^P;Lf=Lf^Q;Mf=Mf^R;Nf=Nf^S;Of=_e[dg|yf]^_e[eg|Df]^_e[cg|If]^_e[cg|Nf]^T;Pf=_e[cg|yf]^_e[dg|Df]^_e[eg|If]^_e[cg|Nf]^U;Qf=_e[cg|yf]^_e[cg|Df]^_e[dg|If]^_e[eg|Nf]^V;Rf=_e[eg|yf]^_e[cg|Df]^_e[cg|If]^_e[dg|Nf]^W;Sf=_e[dg|Cf]^_e[eg|Hf]^_e[cg|Mf]^_e[cg|Bf]^X;Tf=_e[cg|Cf]^_e[dg|Hf]^_e[eg|Mf]^_e[cg|Bf]^Y;Uf=_e[cg|Cf]^_e[cg|Hf]^_e[dg|Mf]^_e[eg|Bf]^Z;Vf=_e[eg|Cf]^_e[cg|Hf]^_e[cg|Mf]^_e[dg|Bf]^$;Wf=_e[dg|Gf]^_e[eg|Lf]^_e[cg|Af]^_e[cg|Ff]^_;Xf=_e[cg|Gf]^_e[dg|Lf]^_e[eg|Af]^_e[cg|Ff]^ab;Yf=_e[cg|Gf]^_e[cg|Lf]^_e[dg|Af]^_e[eg|Ff]^bb;Zf=_e[eg|Gf]^_e[cg|Lf]^_e[cg|Af]^_e[dg|Ff]^cb;$f=_e[dg|Kf]^_e[eg|zf]^_e[cg|Ef]^_e[cg|Jf]^db;_f=_e[cg|Kf]^_e[dg|zf]^_e[eg|Ef]^_e[cg|Jf]^eb;ag=_e[cg|Kf]^_e[cg|zf]^_e[dg|Ef]^_e[eg|Jf]^fb;bg=_e[eg|Kf]^_e[cg|zf]^_e[cg|Ef]^_e[dg|Jf]^gb;yf=_e[dg|Of]^_e[eg|Tf]^_e[cg|Yf]^_e[cg|bg]^hb;zf=_e[cg|Of]^_e[dg|Tf]^_e[eg|Yf]^_e[cg|bg]^ib;Af=_e[cg|Of]^_e[cg|Tf]^_e[dg|Yf]^_e[eg|bg]^jb;Bf=_e[eg|Of]^_e[cg|Tf]^_e[cg|Yf]^_e[dg|bg]^kb;Cf=_e[dg|Sf]^_e[eg|Xf]^_e[cg|ag]^_e[cg|Rf]^lb;Df=_e[cg|Sf]^_e[dg|Xf]^_e[eg|ag]^_e[cg|Rf]^mb;Ef=_e[cg|Sf]^_e[cg|Xf]^_e[dg|ag]^_e[eg|Rf]^nb;Ff=_e[eg|Sf]^_e[cg|Xf]^_e[cg|ag]^_e[dg|Rf]^ob;Gf=_e[dg|Wf]^_e[eg|_f]^_e[cg|Qf]^_e[cg|Vf]^pb;Hf=_e[cg|Wf]^_e[dg|_f]^_e[eg|Qf]^_e[cg|Vf]^qb;If=_e[cg|Wf]^_e[cg|_f]^_e[dg|Qf]^_e[eg|Vf]^rb;Jf=_e[eg|Wf]^_e[cg|_f]^_e[cg|Qf]^_e[dg|Vf]^sb;Kf=_e[dg|$f]^_e[eg|Pf]^_e[cg|Uf]^_e[cg|Zf]^tb;Lf=_e[cg|$f]^_e[dg|Pf]^_e[eg|Uf]^_e[cg|Zf]^ub;Mf=_e[cg|$f]^_e[cg|Pf]^_e[dg|Uf]^_e[eg|Zf]^vb;Nf=_e[eg|$f]^_e[cg|Pf]^_e[cg|Uf]^_e[dg|Zf]^wb;Of=_e[dg|yf]^_e[eg|Df]^_e[cg|If]^_e[cg|Nf]^xb;Pf=_e[cg|yf]^_e[dg|Df]^_e[eg|If]^_e[cg|Nf]^yb;Qf=_e[cg|yf]^_e[cg|Df]^_e[dg|If]^_e[eg|Nf]^zb;Rf=_e[eg|yf]^_e[cg|Df]^_e[cg|If]^_e[dg|Nf]^Ab;Sf=_e[dg|Cf]^_e[eg|Hf]^_e[cg|Mf]^_e[cg|Bf]^Bb;Tf=_e[cg|Cf]^_e[dg|Hf]^_e[eg|Mf]^_e[cg|Bf]^Cb;Uf=_e[cg|Cf]^_e[cg|Hf]^_e[dg|Mf]^_e[eg|Bf]^Db;Vf=_e[eg|Cf]^_e[cg|Hf]^_e[cg|Mf]^_e[dg|Bf]^Eb;Wf=_e[dg|Gf]^_e[eg|Lf]^_e[cg|Af]^_e[cg|Ff]^Fb;Xf=_e[cg|Gf]^_e[dg|Lf]^_e[eg|Af]^_e[cg|Ff]^Gb;Yf=_e[cg|Gf]^_e[cg|Lf]^_e[dg|Af]^_e[eg|Ff]^Hb;Zf=_e[eg|Gf]^_e[cg|Lf]^_e[cg|Af]^_e[dg|Ff]^Ib;$f=_e[dg|Kf]^_e[eg|zf]^_e[cg|Ef]^_e[cg|Jf]^Jb;_f=_e[cg|Kf]^_e[dg|zf]^_e[eg|Ef]^_e[cg|Jf]^Kb;ag=_e[cg|Kf]^_e[cg|zf]^_e[dg|Ef]^_e[eg|Jf]^Lb;bg=_e[eg|Kf]^_e[cg|zf]^_e[cg|Ef]^_e[dg|Jf]^Mb;yf=_e[dg|Of]^_e[eg|Tf]^_e[cg|Yf]^_e[cg|bg]^Nb;zf=_e[cg|Of]^_e[dg|Tf]^_e[eg|Yf]^_e[cg|bg]^Ob;Af=_e[cg|Of]^_e[cg|Tf]^_e[dg|Yf]^_e[eg|bg]^Pb;Bf=_e[eg|Of]^_e[cg|Tf]^_e[cg|Yf]^_e[dg|bg]^Qb;Cf=_e[dg|Sf]^_e[eg|Xf]^_e[cg|ag]^_e[cg|Rf]^Rb;Df=_e[cg|Sf]^_e[dg|Xf]^_e[eg|ag]^_e[cg|Rf]^Sb;Ef=_e[cg|Sf]^_e[cg|Xf]^_e[dg|ag]^_e[eg|Rf]^Tb;Ff=_e[eg|Sf]^_e[cg|Xf]^_e[cg|ag]^_e[dg|Rf]^Ub;Gf=_e[dg|Wf]^_e[eg|_f]^_e[cg|Qf]^_e[cg|Vf]^Vb;Hf=_e[cg|Wf]^_e[dg|_f]^_e[eg|Qf]^_e[cg|Vf]^Wb;If=_e[cg|Wf]^_e[cg|_f]^_e[dg|Qf]^_e[eg|Vf]^Xb;Jf=_e[eg|Wf]^_e[cg|_f]^_e[cg|Qf]^_e[dg|Vf]^Yb;Kf=_e[dg|$f]^_e[eg|Pf]^_e[cg|Uf]^_e[cg|Zf]^Zb;Lf=_e[cg|$f]^_e[dg|Pf]^_e[eg|Uf]^_e[cg|Zf]^$b;Mf=_e[cg|$f]^_e[cg|Pf]^_e[dg|Uf]^_e[eg|Zf]^_b;Nf=_e[eg|$f]^_e[cg|Pf]^_e[cg|Uf]^_e[dg|Zf]^ac;Of=_e[dg|yf]^_e[eg|Df]^_e[cg|If]^_e[cg|Nf]^bc;Pf=_e[cg|yf]^_e[dg|Df]^_e[eg|If]^_e[cg|Nf]^cc;Qf=_e[cg|yf]^_e[cg|Df]^_e[dg|If]^_e[eg|Nf]^dc;Rf=_e[eg|yf]^_e[cg|Df]^_e[cg|If]^_e[dg|Nf]^ec;Sf=_e[dg|Cf]^_e[eg|Hf]^_e[cg|Mf]^_e[cg|Bf]^fc;Tf=_e[cg|Cf]^_e[dg|Hf]^_e[eg|Mf]^_e[cg|Bf]^gc;Uf=_e[cg|Cf]^_e[cg|Hf]^_e[dg|Mf]^_e[eg|Bf]^hc;Vf=_e[eg|Cf]^_e[cg|Hf]^_e[cg|Mf]^_e[dg|Bf]^ic;Wf=_e[dg|Gf]^_e[eg|Lf]^_e[cg|Af]^_e[cg|Ff]^jc;Xf=_e[cg|Gf]^_e[dg|Lf]^_e[eg|Af]^_e[cg|Ff]^kc;Yf=_e[cg|Gf]^_e[cg|Lf]^_e[dg|Af]^_e[eg|Ff]^lc;Zf=_e[eg|Gf]^_e[cg|Lf]^_e[cg|Af]^_e[dg|Ff]^mc;$f=_e[dg|Kf]^_e[eg|zf]^_e[cg|Ef]^_e[cg|Jf]^nc;_f=_e[cg|Kf]^_e[dg|zf]^_e[eg|Ef]^_e[cg|Jf]^oc;ag=_e[cg|Kf]^_e[cg|zf]^_e[dg|Ef]^_e[eg|Jf]^pc;bg=_e[eg|Kf]^_e[cg|zf]^_e[cg|Ef]^_e[dg|Jf]^qc;yf=_e[dg|Of]^_e[eg|Tf]^_e[cg|Yf]^_e[cg|bg]^rc;zf=_e[cg|Of]^_e[dg|Tf]^_e[eg|Yf]^_e[cg|bg]^sc;Af=_e[cg|Of]^_e[cg|Tf]^_e[dg|Yf]^_e[eg|bg]^tc;Bf=_e[eg|Of]^_e[cg|Tf]^_e[cg|Yf]^_e[dg|bg]^uc;Cf=_e[dg|Sf]^_e[eg|Xf]^_e[cg|ag]^_e[cg|Rf]^vc;Df=_e[cg|Sf]^_e[dg|Xf]^_e[eg|ag]^_e[cg|Rf]^wc;Ef=_e[cg|Sf]^_e[cg|Xf]^_e[dg|ag]^_e[eg|Rf]^xc;Ff=_e[eg|Sf]^_e[cg|Xf]^_e[cg|ag]^_e[dg|Rf]^yc;Gf=_e[dg|Wf]^_e[eg|_f]^_e[cg|Qf]^_e[cg|Vf]^zc;Hf=_e[cg|Wf]^_e[dg|_f]^_e[eg|Qf]^_e[cg|Vf]^Ac;If=_e[cg|Wf]^_e[cg|_f]^_e[dg|Qf]^_e[eg|Vf]^Bc;Jf=_e[eg|Wf]^_e[cg|_f]^_e[cg|Qf]^_e[dg|Vf]^Cc;Kf=_e[dg|$f]^_e[eg|Pf]^_e[cg|Uf]^_e[cg|Zf]^Dc;Lf=_e[cg|$f]^_e[dg|Pf]^_e[eg|Uf]^_e[cg|Zf]^Ec;Mf=_e[cg|$f]^_e[cg|Pf]^_e[dg|Uf]^_e[eg|Zf]^Fc;Nf=_e[eg|$f]^_e[cg|Pf]^_e[cg|Uf]^_e[dg|Zf]^Gc;Of=_e[dg|yf]^_e[eg|Df]^_e[cg|If]^_e[cg|Nf]^Hc;Pf=_e[cg|yf]^_e[dg|Df]^_e[eg|If]^_e[cg|Nf]^Ic;Qf=_e[cg|yf]^_e[cg|Df]^_e[dg|If]^_e[eg|Nf]^Jc;Rf=_e[eg|yf]^_e[cg|Df]^_e[cg|If]^_e[dg|Nf]^Kc;Sf=_e[dg|Cf]^_e[eg|Hf]^_e[cg|Mf]^_e[cg|Bf]^Lc;Tf=_e[cg|Cf]^_e[dg|Hf]^_e[eg|Mf]^_e[cg|Bf]^Mc;Uf=_e[cg|Cf]^_e[cg|Hf]^_e[dg|Mf]^_e[eg|Bf]^Nc;Vf=_e[eg|Cf]^_e[cg|Hf]^_e[cg|Mf]^_e[dg|Bf]^Oc;Wf=_e[dg|Gf]^_e[eg|Lf]^_e[cg|Af]^_e[cg|Ff]^Pc;Xf=_e[cg|Gf]^_e[dg|Lf]^_e[eg|Af]^_e[cg|Ff]^Qc;Yf=_e[cg|Gf]^_e[cg|Lf]^_e[dg|Af]^_e[eg|Ff]^Rc;Zf=_e[eg|Gf]^_e[cg|Lf]^_e[cg|Af]^_e[dg|Ff]^Sc;$f=_e[dg|Kf]^_e[eg|zf]^_e[cg|Ef]^_e[cg|Jf]^Tc;_f=_e[cg|Kf]^_e[dg|zf]^_e[eg|Ef]^_e[cg|Jf]^Uc;ag=_e[cg|Kf]^_e[cg|zf]^_e[dg|Ef]^_e[eg|Jf]^Vc;bg=_e[eg|Kf]^_e[cg|zf]^_e[cg|Ef]^_e[dg|Jf]^Wc;yf=_e[dg|Of]^_e[eg|Tf]^_e[cg|Yf]^_e[cg|bg]^Xc;zf=_e[cg|Of]^_e[dg|Tf]^_e[eg|Yf]^_e[cg|bg]^Yc;Af=_e[cg|Of]^_e[cg|Tf]^_e[dg|Yf]^_e[eg|bg]^Zc;Bf=_e[eg|Of]^_e[cg|Tf]^_e[cg|Yf]^_e[dg|bg]^$c;Cf=_e[dg|Sf]^_e[eg|Xf]^_e[cg|ag]^_e[cg|Rf]^_c;Df=_e[cg|Sf]^_e[dg|Xf]^_e[eg|ag]^_e[cg|Rf]^ad;Ef=_e[cg|Sf]^_e[cg|Xf]^_e[dg|ag]^_e[eg|Rf]^bd;Ff=_e[eg|Sf]^_e[cg|Xf]^_e[cg|ag]^_e[dg|Rf]^cd;Gf=_e[dg|Wf]^_e[eg|_f]^_e[cg|Qf]^_e[cg|Vf]^dd;Hf=_e[cg|Wf]^_e[dg|_f]^_e[eg|Qf]^_e[cg|Vf]^ed;If=_e[cg|Wf]^_e[cg|_f]^_e[dg|Qf]^_e[eg|Vf]^fd;Jf=_e[eg|Wf]^_e[cg|_f]^_e[cg|Qf]^_e[dg|Vf]^gd;Kf=_e[dg|$f]^_e[eg|Pf]^_e[cg|Uf]^_e[cg|Zf]^hd;Lf=_e[cg|$f]^_e[dg|Pf]^_e[eg|Uf]^_e[cg|Zf]^id;Mf=_e[cg|$f]^_e[cg|Pf]^_e[dg|Uf]^_e[eg|Zf]^jd;Nf=_e[eg|$f]^_e[cg|Pf]^_e[cg|Uf]^_e[dg|Zf]^kd;Of=_e[dg|yf]^_e[eg|Df]^_e[cg|If]^_e[cg|Nf]^ld;Pf=_e[cg|yf]^_e[dg|Df]^_e[eg|If]^_e[cg|Nf]^md;Qf=_e[cg|yf]^_e[cg|Df]^_e[dg|If]^_e[eg|Nf]^nd;Rf=_e[eg|yf]^_e[cg|Df]^_e[cg|If]^_e[dg|Nf]^od;Sf=_e[dg|Cf]^_e[eg|Hf]^_e[cg|Mf]^_e[cg|Bf]^pd;Tf=_e[cg|Cf]^_e[dg|Hf]^_e[eg|Mf]^_e[cg|Bf]^qd;Uf=_e[cg|Cf]^_e[cg|Hf]^_e[dg|Mf]^_e[eg|Bf]^rd;Vf=_e[eg|Cf]^_e[cg|Hf]^_e[cg|Mf]^_e[dg|Bf]^sd;Wf=_e[dg|Gf]^_e[eg|Lf]^_e[cg|Af]^_e[cg|Ff]^td;Xf=_e[cg|Gf]^_e[dg|Lf]^_e[eg|Af]^_e[cg|Ff]^ud;Yf=_e[cg|Gf]^_e[cg|Lf]^_e[dg|Af]^_e[eg|Ff]^vd;Zf=_e[eg|Gf]^_e[cg|Lf]^_e[cg|Af]^_e[dg|Ff]^wd;$f=_e[dg|Kf]^_e[eg|zf]^_e[cg|Ef]^_e[cg|Jf]^xd;_f=_e[cg|Kf]^_e[dg|zf]^_e[eg|Ef]^_e[cg|Jf]^yd;ag=_e[cg|Kf]^_e[cg|zf]^_e[dg|Ef]^_e[eg|Jf]^zd;bg=_e[eg|Kf]^_e[cg|zf]^_e[cg|Ef]^_e[dg|Jf]^Ad;if((u|0)==16){d=_e[cg|Of]^Bd;e=_e[cg|Tf]^Cd;f=_e[cg|Yf]^Dd;g=_e[cg|bg]^Ed;h=_e[cg|Sf]^Fd;i=_e[cg|Xf]^Gd;j=_e[cg|ag]^Hd;k=_e[cg|Rf]^Id;l=_e[cg|Wf]^Jd;m=_e[cg|_f]^Kd;n=_e[cg|Qf]^Ld;o=_e[cg|Vf]^Md;p=_e[cg|$f]^Nd;q=_e[cg|Pf]^Od;s=_e[cg|Uf]^Pd;t=_e[cg|Zf]^Qd;return}yf=_e[dg|Of]^_e[eg|Tf]^_e[cg|Yf]^_e[cg|bg]^Bd;zf=_e[cg|Of]^_e[dg|Tf]^_e[eg|Yf]^_e[cg|bg]^Cd;Af=_e[cg|Of]^_e[cg|Tf]^_e[dg|Yf]^_e[eg|bg]^Dd;Bf=_e[eg|Of]^_e[cg|Tf]^_e[cg|Yf]^_e[dg|bg]^Ed;Cf=_e[dg|Sf]^_e[eg|Xf]^_e[cg|ag]^_e[cg|Rf]^Fd;Df=_e[cg|Sf]^_e[dg|Xf]^_e[eg|ag]^_e[cg|Rf]^Gd;Ef=_e[cg|Sf]^_e[cg|Xf]^_e[dg|ag]^_e[eg|Rf]^Hd;Ff=_e[eg|Sf]^_e[cg|Xf]^_e[cg|ag]^_e[dg|Rf]^Id;Gf=_e[dg|Wf]^_e[eg|_f]^_e[cg|Qf]^_e[cg|Vf]^Jd;Hf=_e[cg|Wf]^_e[dg|_f]^_e[eg|Qf]^_e[cg|Vf]^Kd;If=_e[cg|Wf]^_e[cg|_f]^_e[dg|Qf]^_e[eg|Vf]^Ld;Jf=_e[eg|Wf]^_e[cg|_f]^_e[cg|Qf]^_e[dg|Vf]^Md;Kf=_e[dg|$f]^_e[eg|Pf]^_e[cg|Uf]^_e[cg|Zf]^Nd;Lf=_e[cg|$f]^_e[dg|Pf]^_e[eg|Uf]^_e[cg|Zf]^Od;Mf=_e[cg|$f]^_e[cg|Pf]^_e[dg|Uf]^_e[eg|Zf]^Pd;Nf=_e[eg|$f]^_e[cg|Pf]^_e[cg|Uf]^_e[dg|Zf]^Qd;Of=_e[dg|yf]^_e[eg|Df]^_e[cg|If]^_e[cg|Nf]^Rd;Pf=_e[cg|yf]^_e[dg|Df]^_e[eg|If]^_e[cg|Nf]^Sd;Qf=_e[cg|yf]^_e[cg|Df]^_e[dg|If]^_e[eg|Nf]^Td;Rf=_e[eg|yf]^_e[cg|Df]^_e[cg|If]^_e[dg|Nf]^Ud;Sf=_e[dg|Cf]^_e[eg|Hf]^_e[cg|Mf]^_e[cg|Bf]^Vd;Tf=_e[cg|Cf]^_e[dg|Hf]^_e[eg|Mf]^_e[cg|Bf]^Wd;Uf=_e[cg|Cf]^_e[cg|Hf]^_e[dg|Mf]^_e[eg|Bf]^Xd;Vf=_e[eg|Cf]^_e[cg|Hf]^_e[cg|Mf]^_e[dg|Bf]^Yd;Wf=_e[dg|Gf]^_e[eg|Lf]^_e[cg|Af]^_e[cg|Ff]^Zd;Xf=_e[cg|Gf]^_e[dg|Lf]^_e[eg|Af]^_e[cg|Ff]^$d;Yf=_e[cg|Gf]^_e[cg|Lf]^_e[dg|Af]^_e[eg|Ff]^_d;Zf=_e[eg|Gf]^_e[cg|Lf]^_e[cg|Af]^_e[dg|Ff]^ae;$f=_e[dg|Kf]^_e[eg|zf]^_e[cg|Ef]^_e[cg|Jf]^be;_f=_e[cg|Kf]^_e[dg|zf]^_e[eg|Ef]^_e[cg|Jf]^ce;ag=_e[cg|Kf]^_e[cg|zf]^_e[dg|Ef]^_e[eg|Jf]^de;bg=_e[eg|Kf]^_e[cg|zf]^_e[cg|Ef]^_e[dg|Jf]^ee;yf=_e[dg|Of]^_e[eg|Tf]^_e[cg|Yf]^_e[cg|bg]^fe;zf=_e[cg|Of]^_e[dg|Tf]^_e[eg|Yf]^_e[cg|bg]^ge;Af=_e[cg|Of]^_e[cg|Tf]^_e[dg|Yf]^_e[eg|bg]^he;Bf=_e[eg|Of]^_e[cg|Tf]^_e[cg|Yf]^_e[dg|bg]^ie;Cf=_e[dg|Sf]^_e[eg|Xf]^_e[cg|ag]^_e[cg|Rf]^je;Df=_e[cg|Sf]^_e[dg|Xf]^_e[eg|ag]^_e[cg|Rf]^ke;Ef=_e[cg|Sf]^_e[cg|Xf]^_e[dg|ag]^_e[eg|Rf]^le;Ff=_e[eg|Sf]^_e[cg|Xf]^_e[cg|ag]^_e[dg|Rf]^me;Gf=_e[dg|Wf]^_e[eg|_f]^_e[cg|Qf]^_e[cg|Vf]^ne;Hf=_e[cg|Wf]^_e[dg|_f]^_e[eg|Qf]^_e[cg|Vf]^oe;If=_e[cg|Wf]^_e[cg|_f]^_e[dg|Qf]^_e[eg|Vf]^pe;Jf=_e[eg|Wf]^_e[cg|_f]^_e[cg|Qf]^_e[dg|Vf]^qe;Kf=_e[dg|$f]^_e[eg|Pf]^_e[cg|Uf]^_e[cg|Zf]^re;Lf=_e[cg|$f]^_e[dg|Pf]^_e[eg|Uf]^_e[cg|Zf]^se;Mf=_e[cg|$f]^_e[cg|Pf]^_e[dg|Uf]^_e[eg|Zf]^te;Nf=_e[eg|$f]^_e[cg|Pf]^_e[cg|Uf]^_e[dg|Zf]^ue;Of=_e[dg|yf]^_e[eg|Df]^_e[cg|If]^_e[cg|Nf]^ve;Pf=_e[cg|yf]^_e[dg|Df]^_e[eg|If]^_e[cg|Nf]^we;Qf=_e[cg|yf]^_e[cg|Df]^_e[dg|If]^_e[eg|Nf]^xe;Rf=_e[eg|yf]^_e[cg|Df]^_e[cg|If]^_e[dg|Nf]^ye;Sf=_e[dg|Cf]^_e[eg|Hf]^_e[cg|Mf]^_e[cg|Bf]^ze;Tf=_e[cg|Cf]^_e[dg|Hf]^_e[eg|Mf]^_e[cg|Bf]^Ae;Uf=_e[cg|Cf]^_e[cg|Hf]^_e[dg|Mf]^_e[eg|Bf]^Be;Vf=_e[eg|Cf]^_e[cg|Hf]^_e[cg|Mf]^_e[dg|Bf]^Ce;Wf=_e[dg|Gf]^_e[eg|Lf]^_e[cg|Af]^_e[cg|Ff]^De;Xf=_e[cg|Gf]^_e[dg|Lf]^_e[eg|Af]^_e[cg|Ff]^Ee;Yf=_e[cg|Gf]^_e[cg|Lf]^_e[dg|Af]^_e[eg|Ff]^Fe;Zf=_e[eg|Gf]^_e[cg|Lf]^_e[cg|Af]^_e[dg|Ff]^Ge;$f=_e[dg|Kf]^_e[eg|zf]^_e[cg|Ef]^_e[cg|Jf]^He;_f=_e[cg|Kf]^_e[dg|zf]^_e[eg|Ef]^_e[cg|Jf]^Ie;ag=_e[cg|Kf]^_e[cg|zf]^_e[dg|Ef]^_e[eg|Jf]^Je;bg=_e[eg|Kf]^_e[cg|zf]^_e[cg|Ef]^_e[dg|Jf]^Ke;d=_e[cg|Of]^Le;e=_e[cg|Tf]^Me;f=_e[cg|Yf]^Ne;g=_e[cg|bg]^Oe;h=_e[cg|Sf]^Pe;i=_e[cg|Xf]^Qe;j=_e[cg|ag]^Re;k=_e[cg|Rf]^Se;l=_e[cg|Wf]^Te;m=_e[cg|_f]^Ue;n=_e[cg|Qf]^Ve;o=_e[cg|Vf]^We;p=_e[cg|$f]^Xe;q=_e[cg|Pf]^Ye;s=_e[cg|Uf]^Ze;t=_e[cg|Zf]^$e}function df(yf,zf,Af,Bf,Cf,Df,Ef,Ff,Gf,Hf,If,Jf,Kf,Lf,Mf,Nf){yf=yf|0;zf=zf|0;Af=Af|0;Bf=Bf|0;Cf=Cf|0;Df=Df|0;Ef=Ef|0;Ff=Ff|0;Gf=Gf|0;Hf=Hf|0;If=If|0;Jf=Jf|0;Kf=Kf|0;Lf=Lf|0;Mf=Mf|0;Nf=Nf|0;var Of=0,Pf=0,Qf=0,Rf=0,Sf=0,Tf=0,Uf=0,Vf=0,Wf=0,Xf=0,Yf=0,Zf=0,$f=0,_f=0,ag=0,bg=0,cg=256,dg=1024,eg=1280,fg=1536,gg=1792;if((u|0)==32){Of=_e[cg|yf^Le]^ve;Pf=_e[cg|Lf^Ye]^we;Qf=_e[cg|If^Ve]^xe;Rf=_e[cg|Ff^Se]^ye;Sf=_e[cg|Cf^Pe]^ze;Tf=_e[cg|zf^Me]^Ae;Uf=_e[cg|Mf^Ze]^Be;Vf=_e[cg|Jf^We]^Ce;Wf=_e[cg|Gf^Te]^De;Xf=_e[cg|Df^Qe]^Ee;Yf=_e[cg|Af^Ne]^Fe;Zf=_e[cg|Nf^$e]^Ge;$f=_e[cg|Kf^Xe]^He;_f=_e[cg|Hf^Ue]^Ie;ag=_e[cg|Ef^Re]^Je;bg=_e[cg|Bf^Oe]^Ke;yf=_e[gg|Of]^_e[eg|Pf]^_e[fg|Qf]^_e[dg|Rf];zf=_e[dg|$f]^_e[gg|_f]^_e[eg|ag]^_e[fg|bg];Af=_e[fg|Wf]^_e[dg|Xf]^_e[gg|Yf]^_e[eg|Zf];Bf=_e[eg|Sf]^_e[fg|Tf]^_e[dg|Uf]^_e[gg|Vf];Cf=_e[gg|Sf]^_e[eg|Tf]^_e[fg|Uf]^_e[dg|Vf];Df=_e[dg|Of]^_e[gg|Pf]^_e[eg|Qf]^_e[fg|Rf];Ef=_e[fg|$f]^_e[dg|_f]^_e[gg|ag]^_e[eg|bg];Ff=_e[eg|Wf]^_e[fg|Xf]^_e[dg|Yf]^_e[gg|Zf];Gf=_e[gg|Wf]^_e[eg|Xf]^_e[fg|Yf]^_e[dg|Zf];Hf=_e[dg|Sf]^_e[gg|Tf]^_e[eg|Uf]^_e[fg|Vf];If=_e[fg|Of]^_e[dg|Pf]^_e[gg|Qf]^_e[eg|Rf];Jf=_e[eg|$f]^_e[fg|_f]^_e[dg|ag]^_e[gg|bg];Kf=_e[gg|$f]^_e[eg|_f]^_e[fg|ag]^_e[dg|bg];Lf=_e[dg|Wf]^_e[gg|Xf]^_e[eg|Yf]^_e[fg|Zf];Mf=_e[fg|Sf]^_e[dg|Tf]^_e[gg|Uf]^_e[eg|Vf];Nf=_e[eg|Of]^_e[fg|Pf]^_e[dg|Qf]^_e[gg|Rf];Of=_e[cg|yf]^fe;Pf=_e[cg|zf]^ge;Qf=_e[cg|Af]^he;Rf=_e[cg|Bf]^ie;Sf=_e[cg|Cf]^je;Tf=_e[cg|Df]^ke;Uf=_e[cg|Ef]^le;Vf=_e[cg|Ff]^me;Wf=_e[cg|Gf]^ne;Xf=_e[cg|Hf]^oe;Yf=_e[cg|If]^pe;Zf=_e[cg|Jf]^qe;$f=_e[cg|Kf]^re;_f=_e[cg|Lf]^se;ag=_e[cg|Mf]^te;bg=_e[cg|Nf]^ue;yf=_e[gg|Of]^_e[eg|Pf]^_e[fg|Qf]^_e[dg|Rf];zf=_e[dg|$f]^_e[gg|_f]^_e[eg|ag]^_e[fg|bg];Af=_e[fg|Wf]^_e[dg|Xf]^_e[gg|Yf]^_e[eg|Zf];Bf=_e[eg|Sf]^_e[fg|Tf]^_e[dg|Uf]^_e[gg|Vf];Cf=_e[gg|Sf]^_e[eg|Tf]^_e[fg|Uf]^_e[dg|Vf];Df=_e[dg|Of]^_e[gg|Pf]^_e[eg|Qf]^_e[fg|Rf];Ef=_e[fg|$f]^_e[dg|_f]^_e[gg|ag]^_e[eg|bg];Ff=_e[eg|Wf]^_e[fg|Xf]^_e[dg|Yf]^_e[gg|Zf];Gf=_e[gg|Wf]^_e[eg|Xf]^_e[fg|Yf]^_e[dg|Zf];Hf=_e[dg|Sf]^_e[gg|Tf]^_e[eg|Uf]^_e[fg|Vf];If=_e[fg|Of]^_e[dg|Pf]^_e[gg|Qf]^_e[eg|Rf];Jf=_e[eg|$f]^_e[fg|_f]^_e[dg|ag]^_e[gg|bg];Kf=_e[gg|$f]^_e[eg|_f]^_e[fg|ag]^_e[dg|bg];Lf=_e[dg|Wf]^_e[gg|Xf]^_e[eg|Yf]^_e[fg|Zf];Mf=_e[fg|Sf]^_e[dg|Tf]^_e[gg|Uf]^_e[eg|Vf];Nf=_e[eg|Of]^_e[fg|Pf]^_e[dg|Qf]^_e[gg|Rf];Of=_e[cg|yf]^Rd;Pf=_e[cg|zf]^Sd;Qf=_e[cg|Af]^Td;Rf=_e[cg|Bf]^Ud;Sf=_e[cg|Cf]^Vd;Tf=_e[cg|Df]^Wd;Uf=_e[cg|Ef]^Xd;Vf=_e[cg|Ff]^Yd;Wf=_e[cg|Gf]^Zd;Xf=_e[cg|Hf]^$d;Yf=_e[cg|If]^_d;Zf=_e[cg|Jf]^ae;$f=_e[cg|Kf]^be;_f=_e[cg|Lf]^ce;ag=_e[cg|Mf]^de;bg=_e[cg|Nf]^ee;yf=_e[gg|Of]^_e[eg|Pf]^_e[fg|Qf]^_e[dg|Rf];zf=_e[dg|$f]^_e[gg|_f]^_e[eg|ag]^_e[fg|bg];Af=_e[fg|Wf]^_e[dg|Xf]^_e[gg|Yf]^_e[eg|Zf];Bf=_e[eg|Sf]^_e[fg|Tf]^_e[dg|Uf]^_e[gg|Vf];Cf=_e[gg|Sf]^_e[eg|Tf]^_e[fg|Uf]^_e[dg|Vf];Df=_e[dg|Of]^_e[gg|Pf]^_e[eg|Qf]^_e[fg|Rf];Ef=_e[fg|$f]^_e[dg|_f]^_e[gg|ag]^_e[eg|bg];Ff=_e[eg|Wf]^_e[fg|Xf]^_e[dg|Yf]^_e[gg|Zf];Gf=_e[gg|Wf]^_e[eg|Xf]^_e[fg|Yf]^_e[dg|Zf];Hf=_e[dg|Sf]^_e[gg|Tf]^_e[eg|Uf]^_e[fg|Vf];If=_e[fg|Of]^_e[dg|Pf]^_e[gg|Qf]^_e[eg|Rf];Jf=_e[eg|$f]^_e[fg|_f]^_e[dg|ag]^_e[gg|bg];Kf=_e[gg|$f]^_e[eg|_f]^_e[fg|ag]^_e[dg|bg];Lf=_e[dg|Wf]^_e[gg|Xf]^_e[eg|Yf]^_e[fg|Zf];Mf=_e[fg|Sf]^_e[dg|Tf]^_e[gg|Uf]^_e[eg|Vf];Nf=_e[eg|Of]^_e[fg|Pf]^_e[dg|Qf]^_e[gg|Rf];Of=_e[cg|yf]^Bd;Pf=_e[cg|zf]^Cd;Qf=_e[cg|Af]^Dd;Rf=_e[cg|Bf]^Ed;Sf=_e[cg|Cf]^Fd;Tf=_e[cg|Df]^Gd;Uf=_e[cg|Ef]^Hd;Vf=_e[cg|Ff]^Id;Wf=_e[cg|Gf]^Jd;Xf=_e[cg|Hf]^Kd;Yf=_e[cg|If]^Ld;Zf=_e[cg|Jf]^Md;$f=_e[cg|Kf]^Nd;_f=_e[cg|Lf]^Od;ag=_e[cg|Mf]^Pd;bg=_e[cg|Nf]^Qd;yf=_e[gg|Of]^_e[eg|Pf]^_e[fg|Qf]^_e[dg|Rf];zf=_e[dg|$f]^_e[gg|_f]^_e[eg|ag]^_e[fg|bg];Af=_e[fg|Wf]^_e[dg|Xf]^_e[gg|Yf]^_e[eg|Zf];Bf=_e[eg|Sf]^_e[fg|Tf]^_e[dg|Uf]^_e[gg|Vf];Cf=_e[gg|Sf]^_e[eg|Tf]^_e[fg|Uf]^_e[dg|Vf];Df=_e[dg|Of]^_e[gg|Pf]^_e[eg|Qf]^_e[fg|Rf];Ef=_e[fg|$f]^_e[dg|_f]^_e[gg|ag]^_e[eg|bg];Ff=_e[eg|Wf]^_e[fg|Xf]^_e[dg|Yf]^_e[gg|Zf];Gf=_e[gg|Wf]^_e[eg|Xf]^_e[fg|Yf]^_e[dg|Zf];Hf=_e[dg|Sf]^_e[gg|Tf]^_e[eg|Uf]^_e[fg|Vf];If=_e[fg|Of]^_e[dg|Pf]^_e[gg|Qf]^_e[eg|Rf];Jf=_e[eg|$f]^_e[fg|_f]^_e[dg|ag]^_e[gg|bg];Kf=_e[gg|$f]^_e[eg|_f]^_e[fg|ag]^_e[dg|bg];Lf=_e[dg|Wf]^_e[gg|Xf]^_e[eg|Yf]^_e[fg|Zf];Mf=_e[fg|Sf]^_e[dg|Tf]^_e[gg|Uf]^_e[eg|Vf];Nf=_e[eg|Of]^_e[fg|Pf]^_e[dg|Qf]^_e[gg|Rf];Of=_e[cg|yf]^ld;Pf=_e[cg|zf]^md;Qf=_e[cg|Af]^nd;Rf=_e[cg|Bf]^od;Sf=_e[cg|Cf]^pd;Tf=_e[cg|Df]^qd;Uf=_e[cg|Ef]^rd;Vf=_e[cg|Ff]^sd;Wf=_e[cg|Gf]^td;Xf=_e[cg|Hf]^ud;Yf=_e[cg|If]^vd;Zf=_e[cg|Jf]^wd;$f=_e[cg|Kf]^xd;_f=_e[cg|Lf]^yd;ag=_e[cg|Mf]^zd;bg=_e[cg|Nf]^Ad}else{Of=_e[cg|yf^Bd]^ld;Pf=_e[cg|Lf^Od]^md;Qf=_e[cg|If^Ld]^nd;Rf=_e[cg|Ff^Id]^od;Sf=_e[cg|Cf^Fd]^pd;Tf=_e[cg|zf^Cd]^qd;Uf=_e[cg|Mf^Pd]^rd;Vf=_e[cg|Jf^Md]^sd;Wf=_e[cg|Gf^Jd]^td;Xf=_e[cg|Df^Gd]^ud;Yf=_e[cg|Af^Dd]^vd;Zf=_e[cg|Nf^Qd]^wd;$f=_e[cg|Kf^Nd]^xd;_f=_e[cg|Hf^Kd]^yd;ag=_e[cg|Ef^Hd]^zd;bg=_e[cg|Bf^Ed]^Ad}yf=_e[gg|Of]^_e[eg|Pf]^_e[fg|Qf]^_e[dg|Rf];zf=_e[dg|$f]^_e[gg|_f]^_e[eg|ag]^_e[fg|bg];Af=_e[fg|Wf]^_e[dg|Xf]^_e[gg|Yf]^_e[eg|Zf];Bf=_e[eg|Sf]^_e[fg|Tf]^_e[dg|Uf]^_e[gg|Vf];Cf=_e[gg|Sf]^_e[eg|Tf]^_e[fg|Uf]^_e[dg|Vf];Df=_e[dg|Of]^_e[gg|Pf]^_e[eg|Qf]^_e[fg|Rf];Ef=_e[fg|$f]^_e[dg|_f]^_e[gg|ag]^_e[eg|bg];Ff=_e[eg|Wf]^_e[fg|Xf]^_e[dg|Yf]^_e[gg|Zf];Gf=_e[gg|Wf]^_e[eg|Xf]^_e[fg|Yf]^_e[dg|Zf];Hf=_e[dg|Sf]^_e[gg|Tf]^_e[eg|Uf]^_e[fg|Vf];If=_e[fg|Of]^_e[dg|Pf]^_e[gg|Qf]^_e[eg|Rf];Jf=_e[eg|$f]^_e[fg|_f]^_e[dg|ag]^_e[gg|bg];Kf=_e[gg|$f]^_e[eg|_f]^_e[fg|ag]^_e[dg|bg];Lf=_e[dg|Wf]^_e[gg|Xf]^_e[eg|Yf]^_e[fg|Zf];Mf=_e[fg|Sf]^_e[dg|Tf]^_e[gg|Uf]^_e[eg|Vf];Nf=_e[eg|Of]^_e[fg|Pf]^_e[dg|Qf]^_e[gg|Rf];Of=_e[cg|yf]^Xc;Pf=_e[cg|zf]^Yc;Qf=_e[cg|Af]^Zc;Rf=_e[cg|Bf]^$c;Sf=_e[cg|Cf]^_c;Tf=_e[cg|Df]^ad;Uf=_e[cg|Ef]^bd;Vf=_e[cg|Ff]^cd;Wf=_e[cg|Gf]^dd;Xf=_e[cg|Hf]^ed;Yf=_e[cg|If]^fd;Zf=_e[cg|Jf]^gd;$f=_e[cg|Kf]^hd;_f=_e[cg|Lf]^id;ag=_e[cg|Mf]^jd;bg=_e[cg|Nf]^kd;yf=_e[gg|Of]^_e[eg|Pf]^_e[fg|Qf]^_e[dg|Rf];zf=_e[dg|$f]^_e[gg|_f]^_e[eg|ag]^_e[fg|bg];Af=_e[fg|Wf]^_e[dg|Xf]^_e[gg|Yf]^_e[eg|Zf];Bf=_e[eg|Sf]^_e[fg|Tf]^_e[dg|Uf]^_e[gg|Vf];Cf=_e[gg|Sf]^_e[eg|Tf]^_e[fg|Uf]^_e[dg|Vf];Df=_e[dg|Of]^_e[gg|Pf]^_e[eg|Qf]^_e[fg|Rf];Ef=_e[fg|$f]^_e[dg|_f]^_e[gg|ag]^_e[eg|bg];Ff=_e[eg|Wf]^_e[fg|Xf]^_e[dg|Yf]^_e[gg|Zf];Gf=_e[gg|Wf]^_e[eg|Xf]^_e[fg|Yf]^_e[dg|Zf];Hf=_e[dg|Sf]^_e[gg|Tf]^_e[eg|Uf]^_e[fg|Vf];If=_e[fg|Of]^_e[dg|Pf]^_e[gg|Qf]^_e[eg|Rf];Jf=_e[eg|$f]^_e[fg|_f]^_e[dg|ag]^_e[gg|bg];Kf=_e[gg|$f]^_e[eg|_f]^_e[fg|ag]^_e[dg|bg];Lf=_e[dg|Wf]^_e[gg|Xf]^_e[eg|Yf]^_e[fg|Zf];Mf=_e[fg|Sf]^_e[dg|Tf]^_e[gg|Uf]^_e[eg|Vf];Nf=_e[eg|Of]^_e[fg|Pf]^_e[dg|Qf]^_e[gg|Rf];Of=_e[cg|yf]^Hc;Pf=_e[cg|zf]^Ic;Qf=_e[cg|Af]^Jc;Rf=_e[cg|Bf]^Kc;Sf=_e[cg|Cf]^Lc;Tf=_e[cg|Df]^Mc;Uf=_e[cg|Ef]^Nc;Vf=_e[cg|Ff]^Oc;Wf=_e[cg|Gf]^Pc;Xf=_e[cg|Hf]^Qc;Yf=_e[cg|If]^Rc;Zf=_e[cg|Jf]^Sc;$f=_e[cg|Kf]^Tc;_f=_e[cg|Lf]^Uc;ag=_e[cg|Mf]^Vc;bg=_e[cg|Nf]^Wc;yf=_e[gg|Of]^_e[eg|Pf]^_e[fg|Qf]^_e[dg|Rf];zf=_e[dg|$f]^_e[gg|_f]^_e[eg|ag]^_e[fg|bg];Af=_e[fg|Wf]^_e[dg|Xf]^_e[gg|Yf]^_e[eg|Zf];Bf=_e[eg|Sf]^_e[fg|Tf]^_e[dg|Uf]^_e[gg|Vf];Cf=_e[gg|Sf]^_e[eg|Tf]^_e[fg|Uf]^_e[dg|Vf];Df=_e[dg|Of]^_e[gg|Pf]^_e[eg|Qf]^_e[fg|Rf];Ef=_e[fg|$f]^_e[dg|_f]^_e[gg|ag]^_e[eg|bg];Ff=_e[eg|Wf]^_e[fg|Xf]^_e[dg|Yf]^_e[gg|Zf];Gf=_e[gg|Wf]^_e[eg|Xf]^_e[fg|Yf]^_e[dg|Zf];Hf=_e[dg|Sf]^_e[gg|Tf]^_e[eg|Uf]^_e[fg|Vf];If=_e[fg|Of]^_e[dg|Pf]^_e[gg|Qf]^_e[eg|Rf];Jf=_e[eg|$f]^_e[fg|_f]^_e[dg|ag]^_e[gg|bg];Kf=_e[gg|$f]^_e[eg|_f]^_e[fg|ag]^_e[dg|bg];Lf=_e[dg|Wf]^_e[gg|Xf]^_e[eg|Yf]^_e[fg|Zf];Mf=_e[fg|Sf]^_e[dg|Tf]^_e[gg|Uf]^_e[eg|Vf];Nf=_e[eg|Of]^_e[fg|Pf]^_e[dg|Qf]^_e[gg|Rf];Of=_e[cg|yf]^rc;Pf=_e[cg|zf]^sc;Qf=_e[cg|Af]^tc;Rf=_e[cg|Bf]^uc;Sf=_e[cg|Cf]^vc;Tf=_e[cg|Df]^wc;Uf=_e[cg|Ef]^xc;Vf=_e[cg|Ff]^yc;Wf=_e[cg|Gf]^zc;Xf=_e[cg|Hf]^Ac;Yf=_e[cg|If]^Bc;Zf=_e[cg|Jf]^Cc;$f=_e[cg|Kf]^Dc;_f=_e[cg|Lf]^Ec;ag=_e[cg|Mf]^Fc;bg=_e[cg|Nf]^Gc;yf=_e[gg|Of]^_e[eg|Pf]^_e[fg|Qf]^_e[dg|Rf];zf=_e[dg|$f]^_e[gg|_f]^_e[eg|ag]^_e[fg|bg];Af=_e[fg|Wf]^_e[dg|Xf]^_e[gg|Yf]^_e[eg|Zf];Bf=_e[eg|Sf]^_e[fg|Tf]^_e[dg|Uf]^_e[gg|Vf];Cf=_e[gg|Sf]^_e[eg|Tf]^_e[fg|Uf]^_e[dg|Vf];Df=_e[dg|Of]^_e[gg|Pf]^_e[eg|Qf]^_e[fg|Rf];Ef=_e[fg|$f]^_e[dg|_f]^_e[gg|ag]^_e[eg|bg];Ff=_e[eg|Wf]^_e[fg|Xf]^_e[dg|Yf]^_e[gg|Zf];Gf=_e[gg|Wf]^_e[eg|Xf]^_e[fg|Yf]^_e[dg|Zf];Hf=_e[dg|Sf]^_e[gg|Tf]^_e[eg|Uf]^_e[fg|Vf];If=_e[fg|Of]^_e[dg|Pf]^_e[gg|Qf]^_e[eg|Rf];Jf=_e[eg|$f]^_e[fg|_f]^_e[dg|ag]^_e[gg|bg];Kf=_e[gg|$f]^_e[eg|_f]^_e[fg|ag]^_e[dg|bg];Lf=_e[dg|Wf]^_e[gg|Xf]^_e[eg|Yf]^_e[fg|Zf];Mf=_e[fg|Sf]^_e[dg|Tf]^_e[gg|Uf]^_e[eg|Vf];Nf=_e[eg|Of]^_e[fg|Pf]^_e[dg|Qf]^_e[gg|Rf];Of=_e[cg|yf]^bc;Pf=_e[cg|zf]^cc;Qf=_e[cg|Af]^dc;Rf=_e[cg|Bf]^ec;Sf=_e[cg|Cf]^fc;Tf=_e[cg|Df]^gc;Uf=_e[cg|Ef]^hc;Vf=_e[cg|Ff]^ic;Wf=_e[cg|Gf]^jc;Xf=_e[cg|Hf]^kc;Yf=_e[cg|If]^lc;Zf=_e[cg|Jf]^mc;$f=_e[cg|Kf]^nc;_f=_e[cg|Lf]^oc;ag=_e[cg|Mf]^pc;bg=_e[cg|Nf]^qc;yf=_e[gg|Of]^_e[eg|Pf]^_e[fg|Qf]^_e[dg|Rf];zf=_e[dg|$f]^_e[gg|_f]^_e[eg|ag]^_e[fg|bg];Af=_e[fg|Wf]^_e[dg|Xf]^_e[gg|Yf]^_e[eg|Zf];Bf=_e[eg|Sf]^_e[fg|Tf]^_e[dg|Uf]^_e[gg|Vf];Cf=_e[gg|Sf]^_e[eg|Tf]^_e[fg|Uf]^_e[dg|Vf];Df=_e[dg|Of]^_e[gg|Pf]^_e[eg|Qf]^_e[fg|Rf];Ef=_e[fg|$f]^_e[dg|_f]^_e[gg|ag]^_e[eg|bg];Ff=_e[eg|Wf]^_e[fg|Xf]^_e[dg|Yf]^_e[gg|Zf];Gf=_e[gg|Wf]^_e[eg|Xf]^_e[fg|Yf]^_e[dg|Zf];Hf=_e[dg|Sf]^_e[gg|Tf]^_e[eg|Uf]^_e[fg|Vf];If=_e[fg|Of]^_e[dg|Pf]^_e[gg|Qf]^_e[eg|Rf];Jf=_e[eg|$f]^_e[fg|_f]^_e[dg|ag]^_e[gg|bg];Kf=_e[gg|$f]^_e[eg|_f]^_e[fg|ag]^_e[dg|bg];Lf=_e[dg|Wf]^_e[gg|Xf]^_e[eg|Yf]^_e[fg|Zf];Mf=_e[fg|Sf]^_e[dg|Tf]^_e[gg|Uf]^_e[eg|Vf];Nf=_e[eg|Of]^_e[fg|Pf]^_e[dg|Qf]^_e[gg|Rf];Of=_e[cg|yf]^Nb;Pf=_e[cg|zf]^Ob;Qf=_e[cg|Af]^Pb;Rf=_e[cg|Bf]^Qb;Sf=_e[cg|Cf]^Rb;Tf=_e[cg|Df]^Sb;Uf=_e[cg|Ef]^Tb;Vf=_e[cg|Ff]^Ub;Wf=_e[cg|Gf]^Vb;Xf=_e[cg|Hf]^Wb;Yf=_e[cg|If]^Xb;Zf=_e[cg|Jf]^Yb;$f=_e[cg|Kf]^Zb;_f=_e[cg|Lf]^$b;ag=_e[cg|Mf]^_b;bg=_e[cg|Nf]^ac;yf=_e[gg|Of]^_e[eg|Pf]^_e[fg|Qf]^_e[dg|Rf];zf=_e[dg|$f]^_e[gg|_f]^_e[eg|ag]^_e[fg|bg];Af=_e[fg|Wf]^_e[dg|Xf]^_e[gg|Yf]^_e[eg|Zf];Bf=_e[eg|Sf]^_e[fg|Tf]^_e[dg|Uf]^_e[gg|Vf];Cf=_e[gg|Sf]^_e[eg|Tf]^_e[fg|Uf]^_e[dg|Vf];Df=_e[dg|Of]^_e[gg|Pf]^_e[eg|Qf]^_e[fg|Rf];Ef=_e[fg|$f]^_e[dg|_f]^_e[gg|ag]^_e[eg|bg];Ff=_e[eg|Wf]^_e[fg|Xf]^_e[dg|Yf]^_e[gg|Zf];Gf=_e[gg|Wf]^_e[eg|Xf]^_e[fg|Yf]^_e[dg|Zf];Hf=_e[dg|Sf]^_e[gg|Tf]^_e[eg|Uf]^_e[fg|Vf];If=_e[fg|Of]^_e[dg|Pf]^_e[gg|Qf]^_e[eg|Rf];Jf=_e[eg|$f]^_e[fg|_f]^_e[dg|ag]^_e[gg|bg];Kf=_e[gg|$f]^_e[eg|_f]^_e[fg|ag]^_e[dg|bg];Lf=_e[dg|Wf]^_e[gg|Xf]^_e[eg|Yf]^_e[fg|Zf];Mf=_e[fg|Sf]^_e[dg|Tf]^_e[gg|Uf]^_e[eg|Vf];Nf=_e[eg|Of]^_e[fg|Pf]^_e[dg|Qf]^_e[gg|Rf];Of=_e[cg|yf]^xb;Pf=_e[cg|zf]^yb;Qf=_e[cg|Af]^zb;Rf=_e[cg|Bf]^Ab;Sf=_e[cg|Cf]^Bb;Tf=_e[cg|Df]^Cb;Uf=_e[cg|Ef]^Db;Vf=_e[cg|Ff]^Eb;Wf=_e[cg|Gf]^Fb;Xf=_e[cg|Hf]^Gb;Yf=_e[cg|If]^Hb;Zf=_e[cg|Jf]^Ib;$f=_e[cg|Kf]^Jb;_f=_e[cg|Lf]^Kb;ag=_e[cg|Mf]^Lb;bg=_e[cg|Nf]^Mb;yf=_e[gg|Of]^_e[eg|Pf]^_e[fg|Qf]^_e[dg|Rf];zf=_e[dg|$f]^_e[gg|_f]^_e[eg|ag]^_e[fg|bg];Af=_e[fg|Wf]^_e[dg|Xf]^_e[gg|Yf]^_e[eg|Zf];Bf=_e[eg|Sf]^_e[fg|Tf]^_e[dg|Uf]^_e[gg|Vf];Cf=_e[gg|Sf]^_e[eg|Tf]^_e[fg|Uf]^_e[dg|Vf];Df=_e[dg|Of]^_e[gg|Pf]^_e[eg|Qf]^_e[fg|Rf];Ef=_e[fg|$f]^_e[dg|_f]^_e[gg|ag]^_e[eg|bg];Ff=_e[eg|Wf]^_e[fg|Xf]^_e[dg|Yf]^_e[gg|Zf];Gf=_e[gg|Wf]^_e[eg|Xf]^_e[fg|Yf]^_e[dg|Zf];Hf=_e[dg|Sf]^_e[gg|Tf]^_e[eg|Uf]^_e[fg|Vf];If=_e[fg|Of]^_e[dg|Pf]^_e[gg|Qf]^_e[eg|Rf];Jf=_e[eg|$f]^_e[fg|_f]^_e[dg|ag]^_e[gg|bg];Kf=_e[gg|$f]^_e[eg|_f]^_e[fg|ag]^_e[dg|bg];Lf=_e[dg|Wf]^_e[gg|Xf]^_e[eg|Yf]^_e[fg|Zf];Mf=_e[fg|Sf]^_e[dg|Tf]^_e[gg|Uf]^_e[eg|Vf];Nf=_e[eg|Of]^_e[fg|Pf]^_e[dg|Qf]^_e[gg|Rf];Of=_e[cg|yf]^hb;Pf=_e[cg|zf]^ib;Qf=_e[cg|Af]^jb;Rf=_e[cg|Bf]^kb;Sf=_e[cg|Cf]^lb;Tf=_e[cg|Df]^mb;Uf=_e[cg|Ef]^nb;Vf=_e[cg|Ff]^ob;Wf=_e[cg|Gf]^pb;Xf=_e[cg|Hf]^qb;Yf=_e[cg|If]^rb;Zf=_e[cg|Jf]^sb;$f=_e[cg|Kf]^tb;_f=_e[cg|Lf]^ub;ag=_e[cg|Mf]^vb;bg=_e[cg|Nf]^wb;yf=_e[gg|Of]^_e[eg|Pf]^_e[fg|Qf]^_e[dg|Rf];zf=_e[dg|$f]^_e[gg|_f]^_e[eg|ag]^_e[fg|bg];Af=_e[fg|Wf]^_e[dg|Xf]^_e[gg|Yf]^_e[eg|Zf];Bf=_e[eg|Sf]^_e[fg|Tf]^_e[dg|Uf]^_e[gg|Vf];Cf=_e[gg|Sf]^_e[eg|Tf]^_e[fg|Uf]^_e[dg|Vf];Df=_e[dg|Of]^_e[gg|Pf]^_e[eg|Qf]^_e[fg|Rf];Ef=_e[fg|$f]^_e[dg|_f]^_e[gg|ag]^_e[eg|bg];Ff=_e[eg|Wf]^_e[fg|Xf]^_e[dg|Yf]^_e[gg|Zf];Gf=_e[gg|Wf]^_e[eg|Xf]^_e[fg|Yf]^_e[dg|Zf];Hf=_e[dg|Sf]^_e[gg|Tf]^_e[eg|Uf]^_e[fg|Vf];If=_e[fg|Of]^_e[dg|Pf]^_e[gg|Qf]^_e[eg|Rf];Jf=_e[eg|$f]^_e[fg|_f]^_e[dg|ag]^_e[gg|bg];Kf=_e[gg|$f]^_e[eg|_f]^_e[fg|ag]^_e[dg|bg];Lf=_e[dg|Wf]^_e[gg|Xf]^_e[eg|Yf]^_e[fg|Zf];Mf=_e[fg|Sf]^_e[dg|Tf]^_e[gg|Uf]^_e[eg|Vf];Nf=_e[eg|Of]^_e[fg|Pf]^_e[dg|Qf]^_e[gg|Rf];Of=_e[cg|yf]^T;Pf=_e[cg|zf]^U;Qf=_e[cg|Af]^V;Rf=_e[cg|Bf]^W;Sf=_e[cg|Cf]^X;Tf=_e[cg|Df]^Y;Uf=_e[cg|Ef]^Z;Vf=_e[cg|Ff]^$;Wf=_e[cg|Gf]^_;Xf=_e[cg|Hf]^ab;Yf=_e[cg|If]^bb;Zf=_e[cg|Jf]^cb;$f=_e[cg|Kf]^db;_f=_e[cg|Lf]^eb;ag=_e[cg|Mf]^fb;bg=_e[cg|Nf]^gb;yf=_e[gg|Of]^_e[eg|Pf]^_e[fg|Qf]^_e[dg|Rf];zf=_e[dg|$f]^_e[gg|_f]^_e[eg|ag]^_e[fg|bg];Af=_e[fg|Wf]^_e[dg|Xf]^_e[gg|Yf]^_e[eg|Zf];Bf=_e[eg|Sf]^_e[fg|Tf]^_e[dg|Uf]^_e[gg|Vf];Cf=_e[gg|Sf]^_e[eg|Tf]^_e[fg|Uf]^_e[dg|Vf];Df=_e[dg|Of]^_e[gg|Pf]^_e[eg|Qf]^_e[fg|Rf];Ef=_e[fg|$f]^_e[dg|_f]^_e[gg|ag]^_e[eg|bg];Ff=_e[eg|Wf]^_e[fg|Xf]^_e[dg|Yf]^_e[gg|Zf];Gf=_e[gg|Wf]^_e[eg|Xf]^_e[fg|Yf]^_e[dg|Zf];Hf=_e[dg|Sf]^_e[gg|Tf]^_e[eg|Uf]^_e[fg|Vf];If=_e[fg|Of]^_e[dg|Pf]^_e[gg|Qf]^_e[eg|Rf];Jf=_e[eg|$f]^_e[fg|_f]^_e[dg|ag]^_e[gg|bg];Kf=_e[gg|$f]^_e[eg|_f]^_e[fg|ag]^_e[dg|bg];Lf=_e[dg|Wf]^_e[gg|Xf]^_e[eg|Yf]^_e[fg|Zf];Mf=_e[fg|Sf]^_e[dg|Tf]^_e[gg|Uf]^_e[eg|Vf];Nf=_e[eg|Of]^_e[fg|Pf]^_e[dg|Qf]^_e[gg|Rf];d=_e[cg|yf]^D;e=_e[cg|zf]^E;f=_e[cg|Af]^F;g=_e[cg|Bf]^G;h=_e[cg|Cf]^H;i=_e[cg|Df]^I;j=_e[cg|Ef]^J;k=_e[cg|Ff]^K;l=_e[cg|Gf]^L;m=_e[cg|Hf]^M;n=_e[cg|If]^N;o=_e[cg|Jf]^O;p=_e[cg|Kf]^P;q=_e[cg|Lf]^Q;s=_e[cg|Mf]^R;t=_e[cg|Nf]^S}function ef(yf,zf,Af,Bf,Cf,Df,Ef,Ff,Gf,Hf,If,Jf,Kf,Lf,Mf,Nf){yf=yf|0;zf=zf|0;Af=Af|0;Bf=Bf|0;Cf=Cf|0;Df=Df|0;Ef=Ef|0;Ff=Ff|0;Gf=Gf|0;Hf=Hf|0;If=If|0;Jf=Jf|0;Kf=Kf|0;Lf=Lf|0;Mf=Mf|0;Nf=Nf|0;d=yf;e=zf;f=Af;g=Bf;h=Cf;i=Df;j=Ef;k=Ff;l=Gf;m=Hf;n=If;o=Jf;p=Kf;q=Lf;s=Mf;t=Nf}function ff(yf){yf=yf|0;_e[yf]=d;_e[yf|1]=e;_e[yf|2]=f;_e[yf|3]=g;_e[yf|4]=h;_e[yf|5]=i;_e[yf|6]=j;_e[yf|7]=k;_e[yf|8]=l;_e[yf|9]=m;_e[yf|10]=n;_e[yf|11]=o;_e[yf|12]=p;_e[yf|13]=q;_e[yf|14]=s;_e[yf|15]=t}function gf(yf,zf,Af,Bf,Cf,Df,Ef,Ff,Gf,Hf,If,Jf,Kf,Lf,Mf,Nf){yf=yf|0;zf=zf|0;Af=Af|0;Bf=Bf|0;Cf=Cf|0;Df=Df|0;Ef=Ef|0;Ff=Ff|0;Gf=Gf|0;Hf=Hf|0;If=If|0;Jf=Jf|0;Kf=Kf|0;Lf=Lf|0;Mf=Mf|0;Nf=Nf|0;D=yf;E=zf;F=Af;G=Bf;H=Cf;I=Df;J=Ef;K=Ff;L=Gf;M=Hf;N=If;O=Jf;P=Kf;Q=Lf;R=Mf;S=Nf;u=16;af()}function hf(yf,zf,Af,Bf,Cf,Df,Ef,Ff,Gf,Hf,If,Jf,Kf,Lf,Mf,Nf,Of,Pf,Qf,Rf,Sf,Tf,Uf,Vf,Wf,Xf,Yf,Zf,$f,_f,ag,bg){yf=yf|0;zf=zf|0;Af=Af|0;Bf=Bf|0;Cf=Cf|0;Df=Df|0;Ef=Ef|0;Ff=Ff|0;Gf=Gf|0;Hf=Hf|0;If=If|0;Jf=Jf|0;Kf=Kf|0;Lf=Lf|0;Mf=Mf|0;Nf=Nf|0;Of=Of|0;Pf=Pf|0;Qf=Qf|0;Rf=Rf|0;Sf=Sf|0;Tf=Tf|0;Uf=Uf|0;Vf=Vf|0;Wf=Wf|0;Xf=Xf|0;Yf=Yf|0;Zf=Zf|0;$f=$f|0;_f=_f|0;ag=ag|0;bg=bg|0;D=yf;E=zf;F=Af;G=Bf;H=Cf;I=Df;J=Ef;K=Ff;L=Gf;M=Hf;N=If;O=Jf;P=Kf;Q=Lf;R=Mf;S=Nf;T=Of;U=Pf;V=Qf;W=Rf;X=Sf;Y=Tf;Z=Uf;$=Vf;_=Wf;ab=Xf;bb=Yf;cb=Zf;db=$f;eb=_f;fb=ag;gb=bg;u=32;bf()}function jf(yf,zf){yf=yf|0;zf=zf|0;var Af=0;if(yf&15)return-1;while((zf|0)>=16){cf(_e[yf]|0,_e[yf|1]|0,_e[yf|2]|0,_e[yf|3]|0,_e[yf|4]|0,_e[yf|5]|0,_e[yf|6]|0,_e[yf|7]|0,_e[yf|8]|0,_e[yf|9]|0,_e[yf|10]|0,_e[yf|11]|0,_e[yf|12]|0,_e[yf|13]|0,_e[yf|14]|0,_e[yf|15]|0);_e[yf]=d;_e[yf|1]=e;_e[yf|2]=f;_e[yf|3]=g;_e[yf|4]=h;_e[yf|5]=i;_e[yf|6]=j;_e[yf|7]=k;_e[yf|8]=l;_e[yf|9]=m;_e[yf|10]=n;_e[yf|11]=o;_e[yf|12]=p;_e[yf|13]=q;_e[yf|14]=s;_e[yf|15]=t;yf=yf+16|0;zf=zf-16|0;Af=Af+16|0}return Af|0}function kf(yf,zf){yf=yf|0;zf=zf|0;var Af=0;if(yf&15)return-1;while((zf|0)>=16){df(_e[yf]|0,_e[yf|1]|0,_e[yf|2]|0,_e[yf|3]|0,_e[yf|4]|0,_e[yf|5]|0,_e[yf|6]|0,_e[yf|7]|0,_e[yf|8]|0,_e[yf|9]|0,_e[yf|10]|0,_e[yf|11]|0,_e[yf|12]|0,_e[yf|13]|0,_e[yf|14]|0,_e[yf|15]|0);_e[yf]=d;_e[yf|1]=e;_e[yf|2]=f;_e[yf|3]=g;_e[yf|4]=h;_e[yf|5]=i;_e[yf|6]=j;_e[yf|7]=k;_e[yf|8]=l;_e[yf|9]=m;_e[yf|10]=n;_e[yf|11]=o;_e[yf|12]=p;_e[yf|13]=q;_e[yf|14]=s;_e[yf|15]=t;yf=yf+16|0;zf=zf-16|0;Af=Af+16|0}return Af|0}function lf(yf,zf){yf=yf|0;zf=zf|0;var Af=0;if(yf&15)return-1;while((zf|0)>=16){cf(d^_e[yf],e^_e[yf|1],f^_e[yf|2],g^_e[yf|3],h^_e[yf|4],i^_e[yf|5],j^_e[yf|6],k^_e[yf|7],l^_e[yf|8],m^_e[yf|9],n^_e[yf|10],o^_e[yf|11],p^_e[yf|12],q^_e[yf|13],s^_e[yf|14],t^_e[yf|15]);_e[yf]=d;_e[yf|1]=e;_e[yf|2]=f;_e[yf|3]=g;_e[yf|4]=h;_e[yf|5]=i;_e[yf|6]=j;_e[yf|7]=k;_e[yf|8]=l;_e[yf|9]=m;_e[yf|10]=n;_e[yf|11]=o;_e[yf|12]=p;_e[yf|13]=q;_e[yf|14]=s;_e[yf|15]=t;yf=yf+16|0;zf=zf-16|0;Af=Af+16|0}return Af|0}function mf(yf,zf){yf=yf|0;zf=zf|0;var Af=0,Bf=0,Cf=0,Df=0,Ef=0,Ff=0,Gf=0,Hf=0,If=0,Jf=0,Kf=0,Lf=0,Mf=0,Nf=0,Of=0,Pf=0,Qf=0;if(yf&15)return-1;Af=d;Bf=e;Cf=f;Df=g;Ef=h;Ff=i;Gf=j;Hf=k;If=l;Jf=m;Kf=n;Lf=o;Mf=p;Nf=q;Of=s;Pf=t;while((zf|0)>=16){df(_e[yf]|0,_e[yf|1]|0,_e[yf|2]|0,_e[yf|3]|0,_e[yf|4]|0,_e[yf|5]|0,_e[yf|6]|0,_e[yf|7]|0,_e[yf|8]|0,_e[yf|9]|0,_e[yf|10]|0,_e[yf|11]|0,_e[yf|12]|0,_e[yf|13]|0,_e[yf|14]|0,_e[yf|15]|0);d=d^Af;Af=_e[yf]|0;e=e^Bf;Bf=_e[yf|1]|0;f=f^Cf;Cf=_e[yf|2]|0;g=g^Df;Df=_e[yf|3]|0;h=h^Ef;Ef=_e[yf|4]|0;i=i^Ff;Ff=_e[yf|5]|0;j=j^Gf;Gf=_e[yf|6]|0;k=k^Hf;Hf=_e[yf|7]|0;l=l^If;If=_e[yf|8]|0;m=m^Jf;Jf=_e[yf|9]|0;n=n^Kf;Kf=_e[yf|10]|0;o=o^Lf;Lf=_e[yf|11]|0;p=p^Mf;Mf=_e[yf|12]|0;q=q^Nf;Nf=_e[yf|13]|0;s=s^Of;Of=_e[yf|14]|0;t=t^Pf;Pf=_e[yf|15]|0;_e[yf]=d;_e[yf|1]=e;_e[yf|2]=f;_e[yf|3]=g;_e[yf|4]=h;_e[yf|5]=i;_e[yf|6]=j;_e[yf|7]=k;_e[yf|8]=l;_e[yf|9]=m;_e[yf|10]=n;_e[yf|11]=o;_e[yf|12]=p;_e[yf|13]=q;_e[yf|14]=s;_e[yf|15]=t;yf=yf+16|0;zf=zf-16|0;Qf=Qf+16|0}d=Af;e=Bf;f=Cf;g=Df;h=Ef;i=Ff;j=Gf;k=Hf;l=If;m=Jf;n=Kf;o=Lf;p=Mf;q=Nf;s=Of;t=Pf;return Qf|0}function nf(yf,zf,Af){yf=yf|0;zf=zf|0;Af=Af|0;if(yf&15)return-1;if(~Af)if(Af&31)return-1;while((zf|0)>=16){cf(d^_e[yf],e^_e[yf|1],f^_e[yf|2],g^_e[yf|3],h^_e[yf|4],i^_e[yf|5],j^_e[yf|6],k^_e[yf|7],l^_e[yf|8],m^_e[yf|9],n^_e[yf|10],o^_e[yf|11],p^_e[yf|12],q^_e[yf|13],s^_e[yf|14],t^_e[yf|15]);yf=yf+16|0;zf=zf-16|0}if((zf|0)>0){d=d^_e[yf];if((zf|0)>1)e=e^_e[yf|1];if((zf|0)>2)f=f^_e[yf|2];if((zf|0)>3)g=g^_e[yf|3];if((zf|0)>4)h=h^_e[yf|4];if((zf|0)>5)i=i^_e[yf|5];if((zf|0)>6)j=j^_e[yf|6];if((zf|0)>7)k=k^_e[yf|7];if((zf|0)>8)l=l^_e[yf|8];if((zf|0)>9)m=m^_e[yf|9];if((zf|0)>10)n=n^_e[yf|10];if((zf|0)>11)o=o^_e[yf|11];if((zf|0)>12)p=p^_e[yf|12];if((zf|0)>13)q=q^_e[yf|13];if((zf|0)>14)s=s^_e[yf|14];cf(d,e,f,g,h,i,j,k,l,m,n,o,p,q,s,t);yf=yf+zf|0;zf=0}if(~Af){_e[Af|0]=d;_e[Af|1]=e;_e[Af|2]=f;_e[Af|3]=g;_e[Af|4]=h;_e[Af|5]=i;_e[Af|6]=j;_e[Af|7]=k;_e[Af|8]=l;_e[Af|9]=m;_e[Af|10]=n;_e[Af|11]=o;_e[Af|12]=p;_e[Af|13]=q;_e[Af|14]=s;_e[Af|15]=t}return 0}function of(yf,zf,Af,Bf,Cf,Df,Ef,Ff,Gf,Hf,If,Jf,Kf,Lf,Mf){yf=yf|0;zf=zf|0;Af=Af|0;Bf=Bf|0;Cf=Cf|0;Df=Df|0;Ef=Ef|0;Ff=Ff|0;Gf=Gf|0;Hf=Hf|0;If=If|0;Jf=Jf|0;Kf=Kf|0;Lf=Lf|0;Mf=Mf|0;var Nf=0;while((zf|0)>=16){cf(Af,Bf,Cf,Df,Ef,Ff,Gf,Hf,If,Jf,Kf,Lf,Mf>>>24,Mf>>>16&255,Mf>>>8&255,Mf&255);_e[yf|0]=_e[yf|0]^d;_e[yf|1]=_e[yf|1]^e;_e[yf|2]=_e[yf|2]^f;_e[yf|3]=_e[yf|3]^g;_e[yf|4]=_e[yf|4]^h;_e[yf|5]=_e[yf|5]^i;_e[yf|6]=_e[yf|6]^j;_e[yf|7]=_e[yf|7]^k;_e[yf|8]=_e[yf|8]^l;_e[yf|9]=_e[yf|9]^m;_e[yf|10]=_e[yf|10]^n;_e[yf|11]=_e[yf|11]^o;_e[yf|12]=_e[yf|12]^p;_e[yf|13]=_e[yf|13]^q;_e[yf|14]=_e[yf|14]^s;_e[yf|15]=_e[yf|15]^t;yf=yf+16|0;zf=zf-16|0;Nf=Nf+16|0;Mf=Mf+1|0}return Nf|0}function pf(yf,zf,Af,Bf,Cf,Df,Ef,Ff,Gf,Hf,If,Jf,Kf,Lf,Mf,Nf,Of,Pf){yf=yf|0;zf=zf|0;Af=Af|0;Bf=Bf|0;Cf=Cf|0;Df=Df|0;Ef=Ef|0;Ff=Ff|0;Gf=Gf|0;Hf=Hf|0;If=If|0;Jf=Jf|0;Kf=Kf|0;Lf=Lf|0;Mf=Mf|0;Nf=Nf|0;Of=Of|0;Pf=Pf|0;var Qf=0,Rf=0,Sf=0,Tf=0,Uf=0,Vf=0,Wf=0,Xf=0,Yf=0,Zf=0,$f=0,_f=0,ag=0,bg=0,cg=0,dg=0,eg=0,fg=0,gg=0,hg=0,ig=0,jg=0,kg=0,lg=0,mg=0,ng=0,og=0,pg=0,qg=0,rg=0,sg=0,tg=0,ug=0;if(yf&15)return-1;Qf=d,Rf=e,Sf=f,Tf=g,Uf=h,Vf=i,Wf=j,Xf=k,Yf=l,Zf=m,$f=n,_f=o,ag=p,bg=q,cg=s,dg=t;while((zf|0)>=16){eg=_e[yf]|0;fg=_e[yf|1]|0;gg=_e[yf|2]|0;hg=_e[yf|3]|0;ig=_e[yf|4]|0;jg=_e[yf|5]|0;kg=_e[yf|6]|0;lg=_e[yf|7]|0;mg=_e[yf|8]|0;ng=_e[yf|9]|0;og=_e[yf|10]|0;pg=_e[yf|11]|0;qg=_e[yf|12]|0;rg=_e[yf|13]|0;sg=_e[yf|14]|0;tg=_e[yf|15]|0;cf(Af,Bf,Cf,Df,Ef,Ff,Gf,Hf,If^Of>>>24,Jf^Of>>>16&255,Kf^Of>>>8&255,Lf^Of&255,Mf^Pf>>>24,Nf^Pf>>>16&255,Pf>>>8&255,Pf&255);_e[yf]=eg^d;_e[yf|1]=fg^e;_e[yf|2]=gg^f;_e[yf|3]=hg^g;_e[yf|4]=ig^h;_e[yf|5]=jg^i;_e[yf|6]=kg^j;_e[yf|7]=lg^k;_e[yf|8]=mg^l;_e[yf|9]=ng^m;_e[yf|10]=og^n;_e[yf|11]=pg^o;_e[yf|12]=qg^p;_e[yf|13]=rg^q;_e[yf|14]=sg^s;_e[yf|15]=tg^t;cf(eg^Qf,fg^Rf,gg^Sf,hg^Tf,ig^Uf,jg^Vf,kg^Wf,lg^Xf,mg^Yf,ng^Zf,og^$f,pg^_f,qg^ag,rg^bg,sg^cg,tg^dg);Qf=d,Rf=e,Sf=f,Tf=g,Uf=h,Vf=i,Wf=j,Xf=k,Yf=l,Zf=m,$f=n,_f=o,ag=p,bg=q,cg=s,dg=t;ug=ug+16|0;yf=yf+16|0;zf=zf-16|0;Pf=Pf+1|0;if((Pf|0)==0)Of=Of+1|0}if((zf|0)>0){eg=_e[yf]|0;fg=(zf|0)>1?_e[yf|1]|0:0;gg=(zf|0)>2?_e[yf|2]|0:0;hg=(zf|0)>3?_e[yf|3]|0:0;ig=(zf|0)>4?_e[yf|4]|0:0;jg=(zf|0)>5?_e[yf|5]|0:0;kg=(zf|0)>6?_e[yf|6]|0:0;lg=(zf|0)>7?_e[yf|7]|0:0;mg=(zf|0)>8?_e[yf|8]|0:0;ng=(zf|0)>9?_e[yf|9]|0:0;og=(zf|0)>10?_e[yf|10]|0:0;pg=(zf|0)>11?_e[yf|11]|0:0;qg=(zf|0)>12?_e[yf|12]|0:0;rg=(zf|0)>13?_e[yf|13]|0:0;sg=(zf|0)>14?_e[yf|14]|0:0;cf(Af,Bf,Cf,Df,Ef,Ff,Gf,Hf,If^Of>>>24,Jf^Of>>>16&255,Kf^Of>>>8&255,Lf^Of&255,Mf^Pf>>>24,Nf^Pf>>>16&255,Pf>>>8&255,Pf&255);_e[yf]=eg^d;if((zf|0)>1)_e[yf|1]=fg^e;if((zf|0)>2)_e[yf|2]=gg^f;if((zf|0)>3)_e[yf|3]=hg^g;if((zf|0)>4)_e[yf|4]=ig^h;if((zf|0)>5)_e[yf|5]=jg^i;if((zf|0)>6)_e[yf|6]=kg^j;if((zf|0)>7)_e[yf|7]=lg^k;if((zf|0)>8)_e[yf|8]=mg^l;if((zf|0)>9)_e[yf|9]=ng^m;if((zf|0)>10)_e[yf|10]=og^n;if((zf|0)>11)_e[yf|11]=pg^o;if((zf|0)>12)_e[yf|12]=qg^p;if((zf|0)>13)_e[yf|13]=rg^q;if((zf|0)>14)_e[yf|14]=sg^s;cf(eg^Qf,fg^Rf,gg^Sf,hg^Tf,ig^Uf,jg^Vf,kg^Wf,lg^Xf,mg^Yf,ng^Zf,og^$f,pg^_f,qg^ag,rg^bg,sg^cg,dg);Qf=d,Rf=e,Sf=f,Tf=g,Uf=h,Vf=i,Wf=j,Xf=k,Yf=l,Zf=m,$f=n,_f=o,ag=p,bg=q,cg=s,dg=t;ug=ug+zf|0;yf=yf+zf|0;zf=0;Pf=Pf+1|0;if((Pf|0)==0)Of=Of+1|0}return ug|0}function qf(yf,zf,Af,Bf,Cf,Df,Ef,Ff,Gf,Hf,If,Jf,Kf,Lf,Mf,Nf,Of,Pf){yf=yf|0;zf=zf|0;Af=Af|0;Bf=Bf|0;Cf=Cf|0;Df=Df|0;Ef=Ef|0;Ff=Ff|0;Gf=Gf|0;Hf=Hf|0;If=If|0;Jf=Jf|0;Kf=Kf|0;Lf=Lf|0;Mf=Mf|0;Nf=Nf|0;Of=Of|0;Pf=Pf|0;var Qf=0,Rf=0,Sf=0,Tf=0,Uf=0,Vf=0,Wf=0,Xf=0,Yf=0,Zf=0,$f=0,_f=0,ag=0,bg=0,cg=0,dg=0,eg=0,fg=0,gg=0,hg=0,ig=0,jg=0,kg=0,lg=0,mg=0,ng=0,og=0,pg=0,qg=0,rg=0,sg=0,tg=0,ug=0;if(yf&15)return-1;Qf=d,Rf=e,Sf=f,Tf=g,Uf=h,Vf=i,Wf=j,Xf=k,Yf=l,Zf=m,$f=n,_f=o,ag=p,bg=q,cg=s,dg=t;while((zf|0)>=16){cf(Af,Bf,Cf,Df,Ef,Ff,Gf,Hf,If^Of>>>24,Jf^Of>>>16&255,Kf^Of>>>8&255,Lf^Of&255,Mf^Pf>>>24,Nf^Pf>>>16&255,Pf>>>8&255,Pf&255);_e[yf]=eg=_e[yf]^d;_e[yf|1]=fg=_e[yf|1]^e;_e[yf|2]=gg=_e[yf|2]^f;_e[yf|3]=hg=_e[yf|3]^g;_e[yf|4]=ig=_e[yf|4]^h;_e[yf|5]=jg=_e[yf|5]^i;_e[yf|6]=kg=_e[yf|6]^j;_e[yf|7]=lg=_e[yf|7]^k;_e[yf|8]=mg=_e[yf|8]^l;_e[yf|9]=ng=_e[yf|9]^m;_e[yf|10]=og=_e[yf|10]^n;_e[yf|11]=pg=_e[yf|11]^o;_e[yf|12]=qg=_e[yf|12]^p;_e[yf|13]=rg=_e[yf|13]^q;_e[yf|14]=sg=_e[yf|14]^s;_e[yf|15]=tg=_e[yf|15]^t;cf(eg^Qf,fg^Rf,gg^Sf,hg^Tf,ig^Uf,jg^Vf,kg^Wf,lg^Xf,mg^Yf,ng^Zf,og^$f,pg^_f,qg^ag,rg^bg,sg^cg,tg^dg);Qf=d,Rf=e,Sf=f,Tf=g,Uf=h,Vf=i,Wf=j,Xf=k,Yf=l,Zf=m,$f=n,_f=o,ag=p,bg=q,cg=s,dg=t;ug=ug+16|0;yf=yf+16|0;zf=zf-16|0;Pf=Pf+1|0;if((Pf|0)==0)Of=Of+1|0}if((zf|0)>0){cf(Af,Bf,Cf,Df,Ef,Ff,Gf,Hf,If^Of>>>24,Jf^Of>>>16&255,Kf^Of>>>8&255,Lf^Of&255,Mf^Pf>>>24,Nf^Pf>>>16&255,Pf>>>8&255,Pf&255);eg=_e[yf]^d;fg=(zf|0)>1?_e[yf|1]^e:0;gg=(zf|0)>2?_e[yf|2]^f:0;hg=(zf|0)>3?_e[yf|3]^g:0;ig=(zf|0)>4?_e[yf|4]^h:0;jg=(zf|0)>5?_e[yf|5]^i:0;kg=(zf|0)>6?_e[yf|6]^j:0;lg=(zf|0)>7?_e[yf|7]^k:0;mg=(zf|0)>8?_e[yf|8]^l:0;ng=(zf|0)>9?_e[yf|9]^m:0;og=(zf|0)>10?_e[yf|10]^n:0;pg=(zf|0)>11?_e[yf|11]^o:0;qg=(zf|0)>12?_e[yf|12]^p:0;rg=(zf|0)>13?_e[yf|13]^q:0;sg=(zf|0)>14?_e[yf|14]^s:0;tg=(zf|0)>15?_e[yf|15]^t:0;_e[yf]=eg;if((zf|0)>1)_e[yf|1]=fg;if((zf|0)>2)_e[yf|2]=gg;if((zf|0)>3)_e[yf|3]=hg;if((zf|0)>4)_e[yf|4]=ig;if((zf|0)>5)_e[yf|5]=jg;if((zf|0)>6)_e[yf|6]=kg;if((zf|0)>7)_e[yf|7]=lg;if((zf|0)>8)_e[yf|8]=mg;if((zf|0)>9)_e[yf|9]=ng;if((zf|0)>10)_e[yf|10]=og;if((zf|0)>11)_e[yf|11]=pg;if((zf|0)>12)_e[yf|12]=qg;if((zf|0)>13)_e[yf|13]=rg;if((zf|0)>14)_e[yf|14]=sg;cf(eg^Qf,fg^Rf,gg^Sf,hg^Tf,ig^Uf,jg^Vf,kg^Wf,lg^Xf,mg^Yf,ng^Zf,og^$f,pg^_f,qg^ag,rg^bg,sg^cg,tg^dg);Qf=d,Rf=e,Sf=f,Tf=g,Uf=h,Vf=i,Wf=j,Xf=k,Yf=l,Zf=m,$f=n,_f=o,ag=p,bg=q,cg=s,dg=t;ug=ug+zf|0;yf=yf+zf|0;zf=0;Pf=Pf+1|0;if((Pf|0)==0)Of=Of+1|0}return ug|0}function rf(yf,zf){yf=yf|0;zf=zf|0;var Af=0;if(yf&15)return-1;while((zf|0)>=16){cf(d,e,f,g,h,i,j,k,l,m,n,o,p,q,s,t);d=d^_e[yf];e=e^_e[yf|1];f=f^_e[yf|2];g=g^_e[yf|3];h=h^_e[yf|4];i=i^_e[yf|5];j=j^_e[yf|6];k=k^_e[yf|7];l=l^_e[yf|8];m=m^_e[yf|9];n=n^_e[yf|10];o=o^_e[yf|11];p=p^_e[yf|12];q=q^_e[yf|13];s=s^_e[yf|14];t=t^_e[yf|15];_e[yf]=d;_e[yf|1]=e;_e[yf|2]=f;_e[yf|3]=g;_e[yf|4]=h;_e[yf|5]=i;_e[yf|6]=j;_e[yf|7]=k;_e[yf|8]=l;_e[yf|9]=m;_e[yf|10]=n;_e[yf|11]=o;_e[yf|12]=p;_e[yf|13]=q;_e[yf|14]=s;_e[yf|15]=t;yf=yf+16|0;zf=zf-16|0;Af=Af+16|0}if((zf|0)>0){cf(d,e,f,g,h,i,j,k,l,m,n,o,p,q,s,t);_e[yf]=_e[yf]^d;if((zf|0)>1)_e[yf|1]=_e[yf|1]^e;if((zf|0)>2)_e[yf|2]=_e[yf|2]^f;if((zf|0)>3)_e[yf|3]=_e[yf|3]^g;if((zf|0)>4)_e[yf|4]=_e[yf|4]^h;if((zf|0)>5)_e[yf|5]=_e[yf|5]^i;if((zf|0)>6)_e[yf|6]=_e[yf|6]^j;if((zf|0)>7)_e[yf|7]=_e[yf|7]^k;if((zf|0)>8)_e[yf|8]=_e[yf|8]^l;if((zf|0)>9)_e[yf|9]=_e[yf|9]^m;if((zf|0)>10)_e[yf|10]=_e[yf|10]^n;if((zf|0)>11)_e[yf|11]=_e[yf|11]^o;if((zf|0)>12)_e[yf|12]=_e[yf|12]^p;if((zf|0)>13)_e[yf|13]=_e[yf|13]^q;if((zf|0)>14)_e[yf|14]=_e[yf|14]^s;Af=Af+zf|0;yf=yf+zf|0;zf=0}return Af|0}function sf(yf,zf){yf=yf|0;zf=zf|0;var Af=0,Bf=0,Cf=0,Df=0,Ef=0,Ff=0,Gf=0,Hf=0,If=0,Jf=0,Kf=0,Lf=0,Mf=0,Nf=0,Of=0,Pf=0,Qf=0;if(yf&15)return-1;while((zf|0)>=16){cf(d,e,f,g,h,i,j,k,l,m,n,o,p,q,s,t);Af=_e[yf]|0;Bf=_e[yf|1]|0;Cf=_e[yf|2]|0;Df=_e[yf|3]|0;Ef=_e[yf|4]|0;Ff=_e[yf|5]|0;Gf=_e[yf|6]|0;Hf=_e[yf|7]|0;If=_e[yf|8]|0;Jf=_e[yf|9]|0;Kf=_e[yf|10]|0;Lf=_e[yf|11]|0;Mf=_e[yf|12]|0;Nf=_e[yf|13]|0;Of=_e[yf|14]|0;Pf=_e[yf|15]|0;_e[yf]=d^Af;_e[yf|1]=e^Bf;_e[yf|2]=f^Cf;_e[yf|3]=g^Df;_e[yf|4]=h^Ef;_e[yf|5]=i^Ff;_e[yf|6]=j^Gf;_e[yf|7]=k^Hf;_e[yf|8]=l^If;_e[yf|9]=m^Jf;_e[yf|10]=n^Kf;_e[yf|11]=o^Lf;_e[yf|12]=p^Mf;_e[yf|13]=q^Nf;_e[yf|14]=s^Of;_e[yf|15]=t^Pf;d=Af;e=Bf;f=Cf;g=Df;h=Ef;i=Ff;j=Gf;k=Hf;l=If;m=Jf;n=Kf;o=Lf;p=Mf;q=Nf;s=Of;t=Pf;yf=yf+16|0;zf=zf-16|0;Qf=Qf+16|0}if((zf|0)>0){cf(d,e,f,g,h,i,j,k,l,m,n,o,p,q,s,t);_e[yf]=_e[yf]^d;if((zf|0)>1)_e[yf|1]=_e[yf|1]^e;if((zf|0)>2)_e[yf|2]=_e[yf|2]^f;if((zf|0)>3)_e[yf|3]=_e[yf|3]^g;if((zf|0)>4)_e[yf|4]=_e[yf|4]^h;if((zf|0)>5)_e[yf|5]=_e[yf|5]^i;if((zf|0)>6)_e[yf|6]=_e[yf|6]^j;if((zf|0)>7)_e[yf|7]=_e[yf|7]^k;if((zf|0)>8)_e[yf|8]=_e[yf|8]^l;if((zf|0)>9)_e[yf|9]=_e[yf|9]^m;if((zf|0)>10)_e[yf|10]=_e[yf|10]^n;if((zf|0)>11)_e[yf|11]=_e[yf|11]^o;if((zf|0)>12)_e[yf|12]=_e[yf|12]^p;if((zf|0)>13)_e[yf|13]=_e[yf|13]^q;if((zf|0)>14)_e[yf|14]=_e[yf|14]^s;Qf=Qf+zf|0;yf=yf+zf|0;zf=0}return Qf|0}function tf(yf,zf,Af,Bf){yf=yf|0;zf=zf|0;Af=Af|0;Bf=Bf|0;var Cf=0,Df=0,Ef=0,Ff=0,Gf=0,Hf=0,If=0,Jf=0,Kf=0,Lf=0;Cf=v|0,Df=w|0,Ef=x|0,Ff=y|0;for(;(Kf|0)<128;Kf=Kf+1|0){if(Cf>>>31){Gf=Gf^yf,Hf=Hf^zf,If=If^Af,Jf=Jf^Bf}Cf=Cf<<1|Df>>>31,Df=Df<<1|Ef>>>31,Ef=Ef<<1|Ff>>>31,Ff=Ff<<1;Lf=Bf&1;Bf=Bf>>>1|Af<<31,Af=Af>>>1|zf<<31,zf=zf>>>1|yf<<31,yf=yf>>>1;if(Lf)yf=yf^3774873600}z=Gf,A=Hf,B=If,C=Jf}function uf(){cf(0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0),v=d<<24|e<<16|f<<8|g,w=h<<24|i<<16|j<<8|k,x=l<<24|m<<16|n<<8|o,y=p<<24|q<<16|s<<8|t;z=A=B=C=0}function vf(yf,zf){yf=yf|0;zf=zf|0;var Af=0;if(yf&15)return-1;z=d<<24|e<<16|f<<8|g,A=h<<24|i<<16|j<<8|k,B=l<<24|m<<16|n<<8|o,C=p<<24|q<<16|s<<8|t;while((zf|0)>=16){tf(z^(_e[yf|0]<<24|_e[yf|1]<<16|_e[yf|2]<<8|_e[yf|3]),A^(_e[yf|4]<<24|_e[yf|5]<<16|_e[yf|6]<<8|_e[yf|7]),B^(_e[yf|8]<<24|_e[yf|9]<<16|_e[yf|10]<<8|_e[yf|11]),C^(_e[yf|12]<<24|_e[yf|13]<<16|_e[yf|14]<<8|_e[yf|15]));yf=yf+16|0,zf=zf-16|0,Af=Af+16|0}d=z>>>24,e=z>>>16&255,f=z>>>8&255,g=z&255,h=A>>>24,i=A>>>16&255,j=A>>>8&255,k=A&255,l=B>>>24,m=B>>>16&255,n=B>>>8&255,o=B&255,p=C>>>24,q=C>>>16&255,s=C>>>8&255,t=C&255;return Af|0}function wf(yf,zf,Af,Bf,Cf,Df,Ef,Ff,Gf,Hf,If,Jf,Kf,Lf,Mf){yf=yf|0;zf=zf|0;Af=Af|0;Bf=Bf|0;Cf=Cf|0;Df=Df|0;Ef=Ef|0;Ff=Ff|0;Gf=Gf|0;Hf=Hf|0;If=If|0;Jf=Jf|0;Kf=Kf|0;Lf=Lf|0;Mf=Mf|0;var Nf=0,Of=0,Pf=0,Qf=0,Rf=0,Sf=0,Tf=0,Uf=0,Vf=0,Wf=0,Xf=0,Yf=0,Zf=0,$f=0,_f=0,ag=0,bg=0;if(yf&15)return-1;while((zf|0)>=16){cf(Af,Bf,Cf,Df,Ef,Ff,Gf,Hf,If,Jf,Kf,Lf,Mf>>>24,Mf>>>16&255,Mf>>>8&255,Mf&255);_e[yf|0]=Nf=_e[yf|0]^d,_e[yf|1]=Of=_e[yf|1]^e,_e[yf|2]=Pf=_e[yf|2]^f,_e[yf|3]=Qf=_e[yf|3]^g,_e[yf|4]=Rf=_e[yf|4]^h,_e[yf|5]=Sf=_e[yf|5]^i,_e[yf|6]=Tf=_e[yf|6]^j,_e[yf|7]=Uf=_e[yf|7]^k,_e[yf|8]=Vf=_e[yf|8]^l,_e[yf|9]=Wf=_e[yf|9]^m,_e[yf|10]=Xf=_e[yf|10]^n,_e[yf|11]=Yf=_e[yf|11]^o,_e[yf|12]=Zf=_e[yf|12]^p,_e[yf|13]=$f=_e[yf|13]^q,_e[yf|14]=_f=_e[yf|14]^s,_e[yf|15]=ag=_e[yf|15]^t;tf(z^(Nf<<24|Of<<16|Pf<<8|Qf),A^(Rf<<24|Sf<<16|Tf<<8|Uf),B^(Vf<<24|Wf<<16|Xf<<8|Yf),C^(Zf<<24|$f<<16|_f<<8|ag));Mf=Mf+1|0;yf=yf+16|0,zf=zf-16|0,bg=bg+16|0}if((zf|0)>0){cf(Af,Bf,Cf,Df,Ef,Ff,Gf,Hf,If,Jf,Kf,Lf,Mf>>>24,Mf>>>16&255,Mf>>>8&255,Mf&255);Nf=_e[yf|0]^d,Of=(zf|0)>1?_e[yf|1]^e:0,Pf=(zf|0)>2?_e[yf|2]^f:0,Qf=(zf|0)>3?_e[yf|3]^g:0,Rf=(zf|0)>4?_e[yf|4]^h:0,Sf=(zf|0)>5?_e[yf|5]^i:0,Tf=(zf|0)>6?_e[yf|6]^j:0,Uf=(zf|0)>7?_e[yf|7]^k:0,Vf=(zf|0)>8?_e[yf|8]^l:0,Wf=(zf|0)>9?_e[yf|9]^m:0,Xf=(zf|0)>10?_e[yf|10]^n:0,Yf=(zf|0)>11?_e[yf|11]^o:0,Zf=(zf|0)>12?_e[yf|12]^p:0,$f=(zf|0)>13?_e[yf|13]^q:0,_f=(zf|0)>14?_e[yf|14]^s:0;ag=0;_e[yf]=Nf;if((zf|0)>1)_e[yf|1]=Of;if((zf|0)>2)_e[yf|2]=Pf;if((zf|0)>3)_e[yf|3]=Qf;if((zf|0)>4)_e[yf|4]=Rf;if((zf|0)>5)_e[yf|5]=Sf;if((zf|0)>6)_e[yf|6]=Tf;if((zf|0)>7)_e[yf|7]=Uf;if((zf|0)>8)_e[yf|8]=Vf;if((zf|0)>9)_e[yf|9]=Wf;if((zf|0)>10)_e[yf|10]=Xf;if((zf|0)>11)_e[yf|11]=Yf;if((zf|0)>12)_e[yf|12]=Zf;if((zf|0)>13)_e[yf|13]=$f;if((zf|0)>14)_e[yf|14]=_f;tf(z^(Nf<<24|Of<<16|Pf<<8|Qf),A^(Rf<<24|Sf<<16|Tf<<8|Uf),B^(Vf<<24|Wf<<16|Xf<<8|Yf),C^(Zf<<24|$f<<16|_f<<8|ag));Mf=Mf+1|0;bg=bg+zf|0}d=z>>>24,e=z>>>16&255,f=z>>>8&255,g=z&255,h=A>>>24,i=A>>>16&255,j=A>>>8&255,k=A&255,l=B>>>24,m=B>>>16&255,n=B>>>8&255,o=B&255,p=C>>>24,q=C>>>16&255,s=C>>>8&255,t=C&255;return bg|0}function xf(yf,zf,Af,Bf,Cf,Df,Ef,Ff,Gf,Hf,If,Jf,Kf,Lf,Mf){yf=yf|0;zf=zf|0;Af=Af|0;Bf=Bf|0;Cf=Cf|0;Df=Df|0;Ef=Ef|0;Ff=Ff|0;Gf=Gf|0;Hf=Hf|0;If=If|0;Jf=Jf|0;Kf=Kf|0;Lf=Lf|0;Mf=Mf|0;var Nf=0,Of=0,Pf=0,Qf=0,Rf=0,Sf=0,Tf=0,Uf=0,Vf=0,Wf=0,Xf=0,Yf=0,Zf=0,$f=0,_f=0,ag=0,bg=0;if(yf&15)return-1;while((zf|0)>=16){Nf=_e[yf|0]|0,Of=_e[yf|1]|0,Pf=_e[yf|2]|0,Qf=_e[yf|3]|0,Rf=_e[yf|4]|0,Sf=_e[yf|5]|0,Tf=_e[yf|6]|0,Uf=_e[yf|7]|0,Vf=_e[yf|8]|0,Wf=_e[yf|9]|0,Xf=_e[yf|10]|0,Yf=_e[yf|11]|0,Zf=_e[yf|12]|0,$f=_e[yf|13]|0,_f=_e[yf|14]|0,ag=_e[yf|15]|0;tf(z^(Nf<<24|Of<<16|Pf<<8|Qf),A^(Rf<<24|Sf<<16|Tf<<8|Uf),B^(Vf<<24|Wf<<16|Xf<<8|Yf),C^(Zf<<24|$f<<16|_f<<8|ag));cf(Af,Bf,Cf,Df,Ef,Ff,Gf,Hf,If,Jf,Kf,Lf,Mf>>>24,Mf>>>16&255,Mf>>>8&255,Mf&255);_e[yf|0]=Nf^d,_e[yf|1]=Of^e,_e[yf|2]=Pf^f,_e[yf|3]=Qf^g,_e[yf|4]=Rf^h,_e[yf|5]=Sf^i,_e[yf|6]=Tf^j,_e[yf|7]=Uf^k,_e[yf|8]=Vf^l,_e[yf|9]=Wf^m,_e[yf|10]=Xf^n,_e[yf|11]=Yf^o,_e[yf|12]=Zf^p,_e[yf|13]=$f^q,_e[yf|14]=_f^s,_e[yf|15]=ag^t;Mf=Mf+1|0;yf=yf+16|0,zf=zf-16|0,bg=bg+16|0}if((zf|0)>0){Nf=_e[yf|0]|0,Of=(zf|0)>1?_e[yf|1]|0:0,Pf=(zf|0)>2?_e[yf|2]|0:0,Qf=(zf|0)>3?_e[yf|3]|0:0,Rf=(zf|0)>4?_e[yf|4]|0:0,Sf=(zf|0)>5?_e[yf|5]|0:0,Tf=(zf|0)>6?_e[yf|6]|0:0,Uf=(zf|0)>7?_e[yf|7]|0:0,Vf=(zf|0)>8?_e[yf|8]|0:0,Wf=(zf|0)>9?_e[yf|9]|0:0,Xf=(zf|0)>10?_e[yf|10]|0:0,Yf=(zf|0)>11?_e[yf|11]|0:0,Zf=(zf|0)>12?_e[yf|12]|0:0,$f=(zf|0)>13?_e[yf|13]|0:0,_f=(zf|0)>14?_e[yf|14]|0:0;ag=0;tf(z^(Nf<<24|Of<<16|Pf<<8|Qf),A^(Rf<<24|Sf<<16|Tf<<8|Uf),B^(Vf<<24|Wf<<16|Xf<<8|Yf),C^(Zf<<24|$f<<16|_f<<8|ag));cf(Af,Bf,Cf,Df,Ef,Ff,Gf,Hf,If,Jf,Kf,Lf,Mf>>>24,Mf>>>16&255,Mf>>>8&255,Mf&255);_e[yf]=Nf^d;if((zf|0)>1)_e[yf|1]=Of^e;if((zf|0)>2)_e[yf|2]=Pf^f;if((zf|0)>3)_e[yf|3]=Qf^g;if((zf|0)>4)_e[yf|4]=Rf^h;if((zf|0)>5)_e[yf|5]=Sf^i;if((zf|0)>6)_e[yf|6]=Tf^j;if((zf|0)>7)_e[yf|7]=Uf^k;if((zf|0)>8)_e[yf|8]=Vf^l;if((zf|0)>9)_e[yf|9]=Wf^m;if((zf|0)>10)_e[yf|10]=Xf^n;if((zf|0)>11)_e[yf|11]=Yf^o;if((zf|0)>12)_e[yf|12]=Zf^p;if((zf|0)>13)_e[yf|13]=$f^q;if((zf|0)>14)_e[yf|14]=_f^s;Mf=Mf+1|0;bg=bg+zf|0}d=z>>>24,e=z>>>16&255,f=z>>>8&255,g=z&255,h=A>>>24,i=A>>>16&255,j=A>>>8&255,k=A&255,l=B>>>24,m=B>>>16&255,n=B>>>8&255,o=B&255,p=C>>>24,q=C>>>16&255,s=C>>>8&255,t=C&255;return bg|0}return{init_state:ef,save_state:ff,init_key_128:gf,init_key_256:hf,ecb_encrypt:jf,ecb_decrypt:kf,cbc_encrypt:lf,cbc_decrypt:mf,cbc_mac:nf,ctr_encrypt:of,ctr_decrypt:of,ccm_encrypt:pf,ccm_decrypt:qf,cfb_encrypt:rf,cfb_decrypt:sf,gcm_init:uf,gcm_ghash:vf,gcm_encrypt:wf,gcm_decrypt:xf}}function s(a,b,c){var d=new Uint8Array(c);return d.set(Wc),r(a,b,c)}function t(a){if(a=a||{},a.heapSize=a.heapSize||4096,a.heapSize<=0||a.heapSize%4096)throw new d("heapSize must be a positive number and multiple of 4096");this.BLOCK_SIZE=Yc,this.heap=a.heap||new Uint8Array(a.heapSize),this.asm=a.asm||s(b,null,this.heap.buffer),this.pos=Xc,this.len=0,this.key=null,this.result=null,this.reset(a)}function u(a){a=a||{},this.result=null,this.pos=Xc,this.len=0;var b=this.asm,c=a.key;if(void 0!==c){if(o(c)||p(c))c=new Uint8Array(c);else{if(!n(c))throw new TypeError("unexpected key type");c=f(c)}if(16===c.length)b.init_key_128.call(b,c[0],c[1],c[2],c[3],c[4],c[5],c[6],c[7],c[8],c[9],c[10],c[11],c[12],c[13],c[14],c[15]);else{if(24===c.length)throw new d("illegal key size");if(32!==c.length)throw new d("illegal key size");b.init_key_256.call(b,c[0],c[1],c[2],c[3],c[4],c[5],c[6],c[7],c[8],c[9],c[10],c[11],c[12],c[13],c[14],c[15],c[16],c[17],c[18],c[19],c[20],c[21],c[22],c[23],c[24],c[25],c[26],c[27],c[28],c[29],c[30],c[31])}this.key=c}return this}function v(a){var b=this.asm;if(void 0!==a){if(o(a)||p(a))a=new Uint8Array(a);else{if(!n(a))throw new TypeError("unexpected iv type");a=f(a)}if(a.length!==Yc)throw new d("illegal iv size");this.iv=a,b.init_state.call(b,a[0],a[1],a[2],a[3],a[4],a[5],a[6],a[7],a[8],a[9],a[10],a[11],a[12],a[13],a[14],a[15])}else this.iv=null,b.init_state.call(b,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0)}function w(a,b,c,d,e){var f=a.length-b,g=e>f?f:e;return a.set(c.subarray(d,d+g),b),g}function x(a){this.padding=!0,this.mode="cbc",this.iv=null,t.call(this,a)}function y(a){x.call(this,a)}function z(a){x.call(this,a)}function A(a){a=a||{},u.call(this,a);var b=a.padding;return this.padding=void 0!==b?!!b:!0,v.call(this,a.iv),this}function B(a){if(!this.key)throw new c("no key is associated with the instance");if(n(a)&&(a=f(a)),o(a)&&(a=new Uint8Array(a)),!p(a))throw new TypeError("data isn't of expected type");for(var b=0,d=a.length||0,e=this.asm,g=this.heap,h=this.pos,i=this.len,j=0,k=Yc*Math.floor((i+d)/Yc),l=0,m=new Uint8Array(k);d>0;)l=w(g,h+i,a,b,d),i+=l,b+=l,d-=l,l=e.cbc_encrypt(h,i),m.set(g.subarray(h,h+l),j),j+=l,i>l?(h+=l,i-=l):(h=Xc,i=0);return this.result=m,this.pos=h,this.len=i,this}function C(){if(!this.key)throw new c("no key is associated with the instance");var a=this.asm,b=this.heap,e=this.padding,f=this.pos,g=this.len,h=Yc*Math.ceil(g/Yc);if(g%Yc===0)e&&(h+=Yc);else if(!e)throw new d("data length must be a multiple of "+Yc);var i=new Uint8Array(h);if(h>g){for(var j=Yc-g%Yc,k=0;j>k;++k)b[f+g+k]=j;g+=j}return g>0&&(a.cbc_encrypt(f,g),i.set(b.subarray(f,f+g))),this.result=i,this.pos=Xc,this.len=0,this}function D(a){var b,c=B.call(this,a).result,d=C.call(this).result;return b=new Uint8Array(c.length+d.length),b.set(c),d.length>0&&b.set(d,c.length),this.result=b,this}function E(a){if(!this.key)throw new c("no key is associated with the instance");if(n(a)&&(a=f(a)),o(a)&&(a=new Uint8Array(a)),!p(a))throw new TypeError("data isn't of expected type");for(var b=0,d=a.length||0,e=this.asm,g=this.heap,h=this.padding,i=this.pos,j=this.len,k=0,l=Yc*Math.floor((j+d)/Yc),m=0,q=new Uint8Array(l);d>0;)m=w(g,i+j,a,b,d),j+=m,b+=m,d-=m,m=e.cbc_decrypt(i,j-(h&&0===d&&j%Yc===0?Yc:0)),q.set(g.subarray(i,i+m),k),k+=m,j>m?(i+=m,j-=m):(i=Xc,j=0);return this.result=q.subarray(0,k),this.pos=i,this.len=j,this}function F(){if(!this.key)throw new c("no key is associated with the instance");var a=this.asm,b=this.heap,e=this.padding,f=this.pos,g=this.len;if(0===g){if(e)throw new c("padding not found");return this.result=new Uint8Array(0),this.pos=Xc,this.len=0,this}if(g%Yc!==0)throw new d("data length must be a multiple of "+Yc);var h=new Uint8Array(g);if(g>0&&(a.cbc_decrypt(f,g),h.set(b.subarray(f,f+g))),e){var i=h[g-1];h=h.subarray(0,g-i)}return this.result=h,this.pos=Xc,this.len=0,this}function G(a){var b,c=E.call(this,a).result,d=F.call(this).result;return b=new Uint8Array(c.length+d.length),b.set(c),d.length>0&&b.set(d,c.length),this.result=b,this}function H(a){this.padding=!1,this.mode="gcm",this.tagSize=Yc,this.adata=null,this.iv=null,this.counter=1,t.call(this,a)}function I(a){H.call(this,a)}function J(a){H.call(this,a)}function K(a){for(var b=this.asm,c=this.heap,d=0,e=a.length||0,f=Xc,g=0,h=0;e>0;)h=w(c,f+g,a,d,e),g+=h,d+=h,e-=h,h=b.gcm_ghash(f,g),f+=h,g-=h,g||(f=Xc);if(g>0){for(;16>g;)c[f|g++]=0;b.gcm_ghash(f,g)}}function L(a){a=a||{};var b=this.asm,c=this.heap;u.call(this,a),b.gcm_init();var e=a.iv;if(void 0!==e&&null!==e){if(o(e)||p(e))e=new Uint8Array(e);else{if(!n(e))throw new TypeError("unexpected iv type");e=f(e)}var g=e.length||0;12!==g?(b.init_state(0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0),K.call(this,e),c[0|Xc]=c[1|Xc]=c[2|Xc]=c[3|Xc]=c[4|Xc]=c[5|Xc]=c[6|Xc]=c[7|Xc]=c[8|Xc]=c[9|Xc]=c[10|Xc]=0,c[11|Xc]=g>>>29,c[12|Xc]=g>>>21&255,c[13|Xc]=g>>>13&255,c[14|Xc]=g>>>5&255,c[15|Xc]=g<<3&255,b.gcm_ghash(Xc,Yc),b.save_state(Xc),this.iv=new Uint8Array(c.subarray(Xc,Xc+Yc))):(this.iv=new Uint8Array(16),this.iv.set(e),this.iv[15]=1)}else this.iv=new Uint8Array(16),this.iv[15]=1;var h=a.counter;if(void 0!==h){if(!m(h))throw new TypeError("counter must be a number");if(1>h||h>4294967295)throw new RangeError("counter must be a positive 32-bit integer");this.counter=h}else this.counter=1;var i=a.tagSize;if(void 0!==i){if(!m(i))throw new TypeError("tagSize must be a number");if(4>i||i>16)throw new d("illegal tagSize value");this.tagSize=i}else this.tagSize=Yc;b.init_state(0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0);var j=a.adata;if(void 0!==j&&null!==j){if(o(j)||p(j))j=new Uint8Array(j);else{if(!n(j))throw new TypeError("unexpected adata type");j=f(j)}if(0===j.length||j.length>ad)throw new d("illegal adata length");K.call(this,j),this.adata=j}else this.adata=null;return this}function M(a){if(!this.key)throw new c("no key is associated with the instance");if(n(a)&&(a=f(a)),o(a)&&(a=new Uint8Array(a)),!p(a))throw new TypeError("data isn't of expected type");var b=this.asm,d=this.heap,e=this.iv,g=this.counter,h=0,i=a.length||0,j=this.pos,k=this.len,l=0,m=Yc*Math.floor((k+i)/Yc),q=0,r=new Uint8Array(m);if((g-1<<4)+k+i>ad)throw new c("counter overflow");for(;i>0;){q=w(d,j+k,a,h,i),k+=q,h+=q,i-=q;var s=e[12]<<24|e[13]<<16|e[14]<<8|e[15];q=b.gcm_encrypt(j,-15&k,e[0],e[1],e[2],e[3],e[4],e[5],e[6],e[7],e[8],e[9],e[10],e[11],s+g|0),q&&r.set(d.subarray(j,j+q),l),g+=q>>>4,l+=q,j+=q,k-=q,k||(j=Xc)}return this.result=r,this.counter=g,this.pos=j,this.len=k,this}function N(){if(!this.key)throw new c("no key is associated with the instance");var a=this.asm,b=this.heap,d=this.iv,e=this.adata,f=this.counter,g=this.tagSize,h=this.pos,i=this.len,j=0,k=new Uint8Array(i+g),l=d[12]<<24|d[13]<<16|d[14]<<8|d[15];i>0&&(j=a.gcm_encrypt(h,i,d[0],d[1],d[2],d[3],d[4],d[5],d[6],d[7],d[8],d[9],d[10],d[11],l+f|0),j&&k.set(b.subarray(h,h+j)));var m=null!==e?e.length||0:0,n=(f-1<<4)+j;return b[0|Xc]=b[1|Xc]=b[2|Xc]=0,b[3|Xc]=m>>>29,b[4|Xc]=m>>>21,b[5|Xc]=m>>>13&255,b[6|Xc]=m>>>5&255,b[7|Xc]=m<<3&255,b[8|Xc]=b[9|Xc]=b[10|Xc]=0,b[11|Xc]=n>>>29,b[12|Xc]=n>>>21&255,b[13|Xc]=n>>>13&255,b[14|Xc]=n>>>5&255,b[15|Xc]=n<<3&255,a.gcm_ghash(Xc,Yc),a.save_state(Xc),a.gcm_encrypt(Xc,Yc,d[0],d[1],d[2],d[3],d[4],d[5],d[6],d[7],d[8],d[9],d[10],d[11],l),k.set(b.subarray(Xc,Xc+g),j),this.result=k,this.counter=1,this.pos=Xc,this.len=0,this}function O(a){var b=M.call(this,a).result,c=N.call(this).result,d=new Uint8Array(b.length+c.length);return b.length&&d.set(b),c.length&&d.set(c,b.length),this.result=d,this}function P(a){if(!this.key)throw new c("no key is associated with the instance");if(n(a)&&(a=f(a)),o(a)&&(a=new Uint8Array(a)),!p(a))throw new TypeError("data isn't of expected type");var b=this.asm,d=this.heap,e=this.iv,g=this.counter,h=this.tagSize,i=0,j=a.length||0,k=this.pos,l=this.len,m=0,q=Yc*Math.floor((l+j-h)/Yc),r=0,s=new Uint8Array(q);if((g-1<<4)+l+j-h>ad)throw new c("counter overflow");for(;j>0;){r=w(d,k+l,a,i,j),l+=r,i+=r,j-=r;var t=e[12]<<24|e[13]<<16|e[14]<<8|e[15];r=b.gcm_decrypt(k,-15&Math.min(l,l+j-h),e[0],e[1],e[2],e[3],e[4],e[5],e[6],e[7],e[8],e[9],e[10],e[11],t+g|0),r&&s.set(d.subarray(k,k+r),m),g+=r>>>4,m+=r,k+=r,l-=r,l||(k=Xc)}return this.result=s,this.counter=g,this.pos=k,this.len=l,this}function Q(){if(!this.key)throw new c("no key is associated with the instance");var a=this.asm,b=this.heap,d=this.iv,f=this.adata,g=this.counter,h=this.tagSize,i=this.pos,j=this.len,k=j-h,l=0,m=new Uint8Array(k),n=new Uint8Array(b.subarray(i+k,i+j)),o=d[12]<<24|d[13]<<16|d[14]<<8|d[15];j>0&&(l=a.gcm_decrypt(i,k,d[0],d[1],d[2],d[3],d[4],d[5],d[6],d[7],d[8],d[9],d[10],d[11],o+g|0),l&&m.set(b.subarray(i,i+l)));var p=null!==f?f.length||0:0,q=(g-1<<4)+l;b[0|Xc]=b[1|Xc]=b[2|Xc]=0,b[3|Xc]=p>>>29,b[4|Xc]=p>>>21,b[5|Xc]=p>>>13&255,b[6|Xc]=p>>>5&255,b[7|Xc]=p<<3&255,b[8|Xc]=b[9|Xc]=b[10|Xc]=0,b[11|Xc]=q>>>29,b[12|Xc]=q>>>21&255,b[13|Xc]=q>>>13&255,b[14|Xc]=q>>>5&255,b[15|Xc]=q<<3&255,a.gcm_ghash(Xc,Yc),a.save_state(Xc),a.gcm_encrypt(Xc,Yc,d[0],d[1],d[2],d[3],d[4],d[5],d[6],d[7],d[8],d[9],d[10],d[11],o);for(var r=0,s=0;h>s;++s)r|=n[s]^b[Xc|s];if(r)throw new e("data integrity check failed");return this.result=m,this.counter=1,this.pos=Xc,this.len=0,this}function R(a){var b=P.call(this,a).result,c=Q.call(this).result,d=new Uint8Array(b.length+c.length);return b.length&&d.set(b),c.length&&d.set(c,b.length),this.result=d,this}function S(a,b,c,d){if(void 0===a)throw new SyntaxError("data required");if(void 0===b)throw new SyntaxError("key required");return fd.reset({key:b,padding:c,iv:d}).encrypt(a).result}function T(a,b,c,d){if(void 0===a)throw new SyntaxError("data required");if(void 0===b)throw new SyntaxError("key required");return fd.reset({key:b,padding:c,iv:d}).decrypt(a).result}function U(a,b,c,d,e){if(void 0===a)throw new SyntaxError("data required");if(void 0===b)throw new SyntaxError("key required");if(void 0===c)throw new SyntaxError("iv required");return gd.reset({key:b,iv:c,adata:d,tagSize:e}).encrypt(a).result}function V(a,b,c,d,e){if(void 0===a)throw new SyntaxError("data required");if(void 0===b)throw new SyntaxError("key required");if(void 0===c)throw new SyntaxError("iv required");return gd.reset({key:b,iv:c,adata:d,tagSize:e}).decrypt(a).result}function W(a,b,c){"use asm";var d=0,e=0,f=0,g=0,h=0,i=0;var j=0,k=0,l=0,m=0,n=0,o=0,p=0,q=0,r=0,s=0;var t=new a.Uint8Array(c);function u(G,H,I,J,K,L,M,N,O,P,Q,R,S,T,U,V){G=G|0;H=H|0;I=I|0;J=J|0;K=K|0;L=L|0;M=M|0;N=N|0;O=O|0;P=P|0;Q=Q|0;R=R|0;S=S|0;T=T|0;U=U|0;V=V|0;var W=0,X=0,Y=0,Z=0,$=0,_=0,ab=0,bb=0,cb=0,db=0,eb=0,fb=0,gb=0,hb=0,ib=0,jb=0,kb=0,lb=0,mb=0,nb=0,ob=0,pb=0,qb=0,rb=0,sb=0,tb=0,ub=0,vb=0,wb=0,xb=0,yb=0,zb=0,Ab=0,Bb=0,Cb=0,Db=0,Eb=0,Fb=0,Gb=0,Hb=0,Ib=0,Jb=0,Kb=0,Lb=0,Mb=0,Nb=0,Ob=0,Pb=0,Qb=0,Rb=0,Sb=0,Tb=0,Ub=0,Vb=0,Wb=0,Xb=0,Yb=0,Zb=0,$b=0,_b=0,ac=0,bc=0,cc=0,dc=0,ec=0,fc=0,gc=0,hc=0,ic=0,jc=0,kc=0;W=d;X=e;Y=f;Z=g;$=h;ab=G+(W<<5|W>>>27)+$+(X&Y|~X&Z)+1518500249|0;$=Z;Z=Y;Y=X<<30|X>>>2;X=W;W=ab;ab=H+(W<<5|W>>>27)+$+(X&Y|~X&Z)+1518500249|0;$=Z;Z=Y;Y=X<<30|X>>>2;X=W;W=ab;ab=I+(W<<5|W>>>27)+$+(X&Y|~X&Z)+1518500249|0;$=Z;Z=Y;Y=X<<30|X>>>2;X=W;W=ab;ab=J+(W<<5|W>>>27)+$+(X&Y|~X&Z)+1518500249|0;$=Z;Z=Y;Y=X<<30|X>>>2;X=W;W=ab;ab=K+(W<<5|W>>>27)+$+(X&Y|~X&Z)+1518500249|0;$=Z;Z=Y;Y=X<<30|X>>>2;X=W;W=ab;ab=L+(W<<5|W>>>27)+$+(X&Y|~X&Z)+1518500249|0;$=Z;Z=Y;Y=X<<30|X>>>2;X=W;W=ab;ab=M+(W<<5|W>>>27)+$+(X&Y|~X&Z)+1518500249|0;$=Z;Z=Y;Y=X<<30|X>>>2;X=W;W=ab;ab=N+(W<<5|W>>>27)+$+(X&Y|~X&Z)+1518500249|0;$=Z;Z=Y;Y=X<<30|X>>>2;X=W;W=ab;ab=O+(W<<5|W>>>27)+$+(X&Y|~X&Z)+1518500249|0;$=Z;Z=Y;Y=X<<30|X>>>2;X=W;W=ab;ab=P+(W<<5|W>>>27)+$+(X&Y|~X&Z)+1518500249|0;$=Z;Z=Y;Y=X<<30|X>>>2;X=W;W=ab;ab=Q+(W<<5|W>>>27)+$+(X&Y|~X&Z)+1518500249|0;$=Z;Z=Y;Y=X<<30|X>>>2;X=W;W=ab;ab=R+(W<<5|W>>>27)+$+(X&Y|~X&Z)+1518500249|0;$=Z;Z=Y;Y=X<<30|X>>>2;X=W;W=ab;ab=S+(W<<5|W>>>27)+$+(X&Y|~X&Z)+1518500249|0;$=Z;Z=Y;Y=X<<30|X>>>2;X=W;W=ab;ab=T+(W<<5|W>>>27)+$+(X&Y|~X&Z)+1518500249|0;$=Z;Z=Y;Y=X<<30|X>>>2;X=W;W=ab;ab=U+(W<<5|W>>>27)+$+(X&Y|~X&Z)+1518500249|0;$=Z;Z=Y;Y=X<<30|X>>>2;X=W;W=ab;ab=V+(W<<5|W>>>27)+$+(X&Y|~X&Z)+1518500249|0;$=Z;Z=Y;Y=X<<30|X>>>2;X=W;W=ab;_=T^O^I^G;bb=_<<1|_>>>31;ab=bb+(W<<5|W>>>27)+$+(X&Y|~X&Z)+1518500249|0;$=Z;Z=Y;Y=X<<30|X>>>2;X=W;W=ab;_=U^P^J^H;cb=_<<1|_>>>31;ab=cb+(W<<5|W>>>27)+$+(X&Y|~X&Z)+1518500249|0;$=Z;Z=Y;Y=X<<30|X>>>2;X=W;W=ab;_=V^Q^K^I;db=_<<1|_>>>31;ab=db+(W<<5|W>>>27)+$+(X&Y|~X&Z)+1518500249|0;$=Z;Z=Y;Y=X<<30|X>>>2;X=W;W=ab;_=bb^R^L^J;eb=_<<1|_>>>31;ab=eb+(W<<5|W>>>27)+$+(X&Y|~X&Z)+1518500249|0;$=Z;Z=Y;Y=X<<30|X>>>2;X=W;W=ab;_=cb^S^M^K;fb=_<<1|_>>>31;ab=fb+(W<<5|W>>>27)+$+(X^Y^Z)+1859775393|0;$=Z;Z=Y;Y=X<<30|X>>>2;X=W;W=ab;_=db^T^N^L;gb=_<<1|_>>>31;ab=gb+(W<<5|W>>>27)+$+(X^Y^Z)+1859775393|0;$=Z;Z=Y;Y=X<<30|X>>>2;X=W;W=ab;_=eb^U^O^M;hb=_<<1|_>>>31;ab=hb+(W<<5|W>>>27)+$+(X^Y^Z)+1859775393|0;$=Z;Z=Y;Y=X<<30|X>>>2;X=W;W=ab;_=fb^V^P^N;ib=_<<1|_>>>31;ab=ib+(W<<5|W>>>27)+$+(X^Y^Z)+1859775393|0;$=Z;Z=Y;Y=X<<30|X>>>2;X=W;W=ab;_=gb^bb^Q^O;jb=_<<1|_>>>31;ab=jb+(W<<5|W>>>27)+$+(X^Y^Z)+1859775393|0;$=Z;Z=Y;Y=X<<30|X>>>2;X=W;W=ab;_=hb^cb^R^P;kb=_<<1|_>>>31;ab=kb+(W<<5|W>>>27)+$+(X^Y^Z)+1859775393|0;$=Z;Z=Y;Y=X<<30|X>>>2;X=W;W=ab;_=ib^db^S^Q;lb=_<<1|_>>>31;ab=lb+(W<<5|W>>>27)+$+(X^Y^Z)+1859775393|0;$=Z;Z=Y;Y=X<<30|X>>>2;X=W;W=ab;_=jb^eb^T^R;mb=_<<1|_>>>31;ab=mb+(W<<5|W>>>27)+$+(X^Y^Z)+1859775393|0;$=Z;Z=Y;Y=X<<30|X>>>2;X=W;W=ab;_=kb^fb^U^S;nb=_<<1|_>>>31;ab=nb+(W<<5|W>>>27)+$+(X^Y^Z)+1859775393|0;$=Z;Z=Y;Y=X<<30|X>>>2;X=W;W=ab;_=lb^gb^V^T;ob=_<<1|_>>>31;ab=ob+(W<<5|W>>>27)+$+(X^Y^Z)+1859775393|0;$=Z;Z=Y;Y=X<<30|X>>>2;X=W;W=ab;_=mb^hb^bb^U;pb=_<<1|_>>>31;ab=pb+(W<<5|W>>>27)+$+(X^Y^Z)+1859775393|0;$=Z;Z=Y;Y=X<<30|X>>>2;X=W;W=ab;_=nb^ib^cb^V;qb=_<<1|_>>>31;ab=qb+(W<<5|W>>>27)+$+(X^Y^Z)+1859775393|0;$=Z;Z=Y;Y=X<<30|X>>>2;X=W;W=ab;_=ob^jb^db^bb;rb=_<<1|_>>>31;ab=rb+(W<<5|W>>>27)+$+(X^Y^Z)+1859775393|0;$=Z;Z=Y;Y=X<<30|X>>>2;X=W;W=ab;_=pb^kb^eb^cb;sb=_<<1|_>>>31;ab=sb+(W<<5|W>>>27)+$+(X^Y^Z)+1859775393|0;$=Z;Z=Y;Y=X<<30|X>>>2;X=W;W=ab;_=qb^lb^fb^db;tb=_<<1|_>>>31;ab=tb+(W<<5|W>>>27)+$+(X^Y^Z)+1859775393|0;$=Z;Z=Y;Y=X<<30|X>>>2;X=W;W=ab;_=rb^mb^gb^eb;ub=_<<1|_>>>31;ab=ub+(W<<5|W>>>27)+$+(X^Y^Z)+1859775393|0;$=Z;Z=Y;Y=X<<30|X>>>2;X=W;W=ab;_=sb^nb^hb^fb;vb=_<<1|_>>>31;ab=vb+(W<<5|W>>>27)+$+(X^Y^Z)+1859775393|0;$=Z;Z=Y;Y=X<<30|X>>>2;X=W;W=ab;_=tb^ob^ib^gb;wb=_<<1|_>>>31;ab=wb+(W<<5|W>>>27)+$+(X^Y^Z)+1859775393|0;$=Z;Z=Y;Y=X<<30|X>>>2;X=W;W=ab;_=ub^pb^jb^hb;xb=_<<1|_>>>31;ab=xb+(W<<5|W>>>27)+$+(X^Y^Z)+1859775393|0;$=Z;Z=Y;Y=X<<30|X>>>2;X=W;W=ab;_=vb^qb^kb^ib;yb=_<<1|_>>>31;ab=yb+(W<<5|W>>>27)+$+(X^Y^Z)+1859775393|0;$=Z;Z=Y;Y=X<<30|X>>>2;X=W;W=ab;_=wb^rb^lb^jb;zb=_<<1|_>>>31;ab=zb+(W<<5|W>>>27)+$+(X&Y|X&Z|Y&Z)-1894007588|0;$=Z;Z=Y;Y=X<<30|X>>>2;X=W;W=ab;_=xb^sb^mb^kb;Ab=_<<1|_>>>31;ab=Ab+(W<<5|W>>>27)+$+(X&Y|X&Z|Y&Z)-1894007588|0;$=Z;Z=Y;Y=X<<30|X>>>2;X=W;W=ab;_=yb^tb^nb^lb;Bb=_<<1|_>>>31;ab=Bb+(W<<5|W>>>27)+$+(X&Y|X&Z|Y&Z)-1894007588|0;$=Z;Z=Y;Y=X<<30|X>>>2;X=W;W=ab;_=zb^ub^ob^mb;Cb=_<<1|_>>>31;ab=Cb+(W<<5|W>>>27)+$+(X&Y|X&Z|Y&Z)-1894007588|0;$=Z;Z=Y;Y=X<<30|X>>>2;X=W;W=ab;_=Ab^vb^pb^nb;Db=_<<1|_>>>31;ab=Db+(W<<5|W>>>27)+$+(X&Y|X&Z|Y&Z)-1894007588|0;$=Z;Z=Y;Y=X<<30|X>>>2;X=W;W=ab;_=Bb^wb^qb^ob;Eb=_<<1|_>>>31;ab=Eb+(W<<5|W>>>27)+$+(X&Y|X&Z|Y&Z)-1894007588|0;$=Z;Z=Y;Y=X<<30|X>>>2;X=W;W=ab;_=Cb^xb^rb^pb;Fb=_<<1|_>>>31;ab=Fb+(W<<5|W>>>27)+$+(X&Y|X&Z|Y&Z)-1894007588|0;$=Z;Z=Y;Y=X<<30|X>>>2;X=W;W=ab;_=Db^yb^sb^qb;Gb=_<<1|_>>>31;ab=Gb+(W<<5|W>>>27)+$+(X&Y|X&Z|Y&Z)-1894007588|0;$=Z;Z=Y;Y=X<<30|X>>>2;X=W;W=ab;_=Eb^zb^tb^rb;Hb=_<<1|_>>>31;ab=Hb+(W<<5|W>>>27)+$+(X&Y|X&Z|Y&Z)-1894007588|0;$=Z;Z=Y;Y=X<<30|X>>>2;X=W;W=ab;_=Fb^Ab^ub^sb;Ib=_<<1|_>>>31;ab=Ib+(W<<5|W>>>27)+$+(X&Y|X&Z|Y&Z)-1894007588|0;$=Z;Z=Y;Y=X<<30|X>>>2;X=W;W=ab;_=Gb^Bb^vb^tb;Jb=_<<1|_>>>31;ab=Jb+(W<<5|W>>>27)+$+(X&Y|X&Z|Y&Z)-1894007588|0;$=Z;Z=Y;Y=X<<30|X>>>2;X=W;W=ab;_=Hb^Cb^wb^ub;Kb=_<<1|_>>>31;ab=Kb+(W<<5|W>>>27)+$+(X&Y|X&Z|Y&Z)-1894007588|0;$=Z;Z=Y;Y=X<<30|X>>>2;X=W;W=ab;_=Ib^Db^xb^vb;Lb=_<<1|_>>>31;ab=Lb+(W<<5|W>>>27)+$+(X&Y|X&Z|Y&Z)-1894007588|0;$=Z;Z=Y;Y=X<<30|X>>>2;X=W;W=ab;_=Jb^Eb^yb^wb;Mb=_<<1|_>>>31;ab=Mb+(W<<5|W>>>27)+$+(X&Y|X&Z|Y&Z)-1894007588|0;$=Z;Z=Y;Y=X<<30|X>>>2;X=W;W=ab;_=Kb^Fb^zb^xb;Nb=_<<1|_>>>31;ab=Nb+(W<<5|W>>>27)+$+(X&Y|X&Z|Y&Z)-1894007588|0;$=Z;Z=Y;Y=X<<30|X>>>2;X=W;W=ab;_=Lb^Gb^Ab^yb;Ob=_<<1|_>>>31;ab=Ob+(W<<5|W>>>27)+$+(X&Y|X&Z|Y&Z)-1894007588|0;$=Z;Z=Y;Y=X<<30|X>>>2;X=W;W=ab;_=Mb^Hb^Bb^zb;Pb=_<<1|_>>>31;ab=Pb+(W<<5|W>>>27)+$+(X&Y|X&Z|Y&Z)-1894007588|0;$=Z;Z=Y;Y=X<<30|X>>>2;X=W;W=ab;_=Nb^Ib^Cb^Ab;Qb=_<<1|_>>>31;ab=Qb+(W<<5|W>>>27)+$+(X&Y|X&Z|Y&Z)-1894007588|0;$=Z;Z=Y;Y=X<<30|X>>>2;X=W;W=ab;_=Ob^Jb^Db^Bb;Rb=_<<1|_>>>31;ab=Rb+(W<<5|W>>>27)+$+(X&Y|X&Z|Y&Z)-1894007588|0;$=Z;Z=Y;Y=X<<30|X>>>2;X=W;W=ab;_=Pb^Kb^Eb^Cb;Sb=_<<1|_>>>31;ab=Sb+(W<<5|W>>>27)+$+(X&Y|X&Z|Y&Z)-1894007588|0;$=Z;Z=Y;Y=X<<30|X>>>2;X=W;W=ab;_=Qb^Lb^Fb^Db;Tb=_<<1|_>>>31;ab=Tb+(W<<5|W>>>27)+$+(X^Y^Z)-899497514|0;$=Z;Z=Y;Y=X<<30|X>>>2;X=W;W=ab;_=Rb^Mb^Gb^Eb;Ub=_<<1|_>>>31;ab=Ub+(W<<5|W>>>27)+$+(X^Y^Z)-899497514|0;$=Z;Z=Y;Y=X<<30|X>>>2;X=W;W=ab;_=Sb^Nb^Hb^Fb;Vb=_<<1|_>>>31;ab=Vb+(W<<5|W>>>27)+$+(X^Y^Z)-899497514|0;$=Z;Z=Y;Y=X<<30|X>>>2;X=W;W=ab;_=Tb^Ob^Ib^Gb;Wb=_<<1|_>>>31;ab=Wb+(W<<5|W>>>27)+$+(X^Y^Z)-899497514|0;$=Z;Z=Y;Y=X<<30|X>>>2;X=W;W=ab;_=Ub^Pb^Jb^Hb;Xb=_<<1|_>>>31;ab=Xb+(W<<5|W>>>27)+$+(X^Y^Z)-899497514|0;$=Z;Z=Y;Y=X<<30|X>>>2;X=W;W=ab;_=Vb^Qb^Kb^Ib;Yb=_<<1|_>>>31;ab=Yb+(W<<5|W>>>27)+$+(X^Y^Z)-899497514|0;$=Z;Z=Y;Y=X<<30|X>>>2;X=W;W=ab;_=Wb^Rb^Lb^Jb;Zb=_<<1|_>>>31;ab=Zb+(W<<5|W>>>27)+$+(X^Y^Z)-899497514|0;$=Z;Z=Y;Y=X<<30|X>>>2;X=W;W=ab;_=Xb^Sb^Mb^Kb;$b=_<<1|_>>>31;ab=$b+(W<<5|W>>>27)+$+(X^Y^Z)-899497514|0;$=Z;Z=Y;Y=X<<30|X>>>2;X=W;W=ab;_=Yb^Tb^Nb^Lb;_b=_<<1|_>>>31;ab=_b+(W<<5|W>>>27)+$+(X^Y^Z)-899497514|0;$=Z;Z=Y;Y=X<<30|X>>>2;X=W;W=ab;_=Zb^Ub^Ob^Mb;ac=_<<1|_>>>31;ab=ac+(W<<5|W>>>27)+$+(X^Y^Z)-899497514|0;$=Z;Z=Y;Y=X<<30|X>>>2;X=W;W=ab;_=$b^Vb^Pb^Nb;bc=_<<1|_>>>31;ab=bc+(W<<5|W>>>27)+$+(X^Y^Z)-899497514|0;$=Z;Z=Y;Y=X<<30|X>>>2;X=W;W=ab;_=_b^Wb^Qb^Ob;cc=_<<1|_>>>31;ab=cc+(W<<5|W>>>27)+$+(X^Y^Z)-899497514|0;$=Z;Z=Y;Y=X<<30|X>>>2;X=W;W=ab;_=ac^Xb^Rb^Pb;dc=_<<1|_>>>31;ab=dc+(W<<5|W>>>27)+$+(X^Y^Z)-899497514|0;$=Z;Z=Y;Y=X<<30|X>>>2;X=W;W=ab;_=bc^Yb^Sb^Qb;ec=_<<1|_>>>31;ab=ec+(W<<5|W>>>27)+$+(X^Y^Z)-899497514|0;$=Z;Z=Y;Y=X<<30|X>>>2;X=W;W=ab;_=cc^Zb^Tb^Rb;fc=_<<1|_>>>31;ab=fc+(W<<5|W>>>27)+$+(X^Y^Z)-899497514|0;$=Z;Z=Y;Y=X<<30|X>>>2;X=W;W=ab;_=dc^$b^Ub^Sb;gc=_<<1|_>>>31;ab=gc+(W<<5|W>>>27)+$+(X^Y^Z)-899497514|0;$=Z;Z=Y;Y=X<<30|X>>>2;X=W;W=ab;_=ec^_b^Vb^Tb;hc=_<<1|_>>>31;ab=hc+(W<<5|W>>>27)+$+(X^Y^Z)-899497514|0;$=Z;Z=Y;Y=X<<30|X>>>2;X=W;W=ab;_=fc^ac^Wb^Ub;ic=_<<1|_>>>31;ab=ic+(W<<5|W>>>27)+$+(X^Y^Z)-899497514|0;$=Z;Z=Y;Y=X<<30|X>>>2;X=W;W=ab;_=gc^bc^Xb^Vb;jc=_<<1|_>>>31;ab=jc+(W<<5|W>>>27)+$+(X^Y^Z)-899497514|0;$=Z;Z=Y;Y=X<<30|X>>>2;X=W;W=ab;_=hc^cc^Yb^Wb;kc=_<<1|_>>>31;ab=kc+(W<<5|W>>>27)+$+(X^Y^Z)-899497514|0;$=Z;Z=Y;Y=X<<30|X>>>2;X=W;W=ab;d=d+W|0;e=e+X|0;f=f+Y|0;g=g+Z|0;h=h+$|0}function v(G){G=G|0;u(t[G|0]<<24|t[G|1]<<16|t[G|2]<<8|t[G|3],t[G|4]<<24|t[G|5]<<16|t[G|6]<<8|t[G|7],t[G|8]<<24|t[G|9]<<16|t[G|10]<<8|t[G|11],t[G|12]<<24|t[G|13]<<16|t[G|14]<<8|t[G|15],t[G|16]<<24|t[G|17]<<16|t[G|18]<<8|t[G|19],t[G|20]<<24|t[G|21]<<16|t[G|22]<<8|t[G|23],t[G|24]<<24|t[G|25]<<16|t[G|26]<<8|t[G|27],t[G|28]<<24|t[G|29]<<16|t[G|30]<<8|t[G|31],t[G|32]<<24|t[G|33]<<16|t[G|34]<<8|t[G|35],t[G|36]<<24|t[G|37]<<16|t[G|38]<<8|t[G|39],t[G|40]<<24|t[G|41]<<16|t[G|42]<<8|t[G|43],t[G|44]<<24|t[G|45]<<16|t[G|46]<<8|t[G|47],t[G|48]<<24|t[G|49]<<16|t[G|50]<<8|t[G|51],t[G|52]<<24|t[G|53]<<16|t[G|54]<<8|t[G|55],t[G|56]<<24|t[G|57]<<16|t[G|58]<<8|t[G|59],t[G|60]<<24|t[G|61]<<16|t[G|62]<<8|t[G|63])}function w(G){G=G|0;t[G|0]=d>>>24;t[G|1]=d>>>16&255;t[G|2]=d>>>8&255;t[G|3]=d&255;t[G|4]=e>>>24;t[G|5]=e>>>16&255;t[G|6]=e>>>8&255;t[G|7]=e&255;t[G|8]=f>>>24;t[G|9]=f>>>16&255;t[G|10]=f>>>8&255;t[G|11]=f&255;t[G|12]=g>>>24;t[G|13]=g>>>16&255;t[G|14]=g>>>8&255;t[G|15]=g&255;t[G|16]=h>>>24;t[G|17]=h>>>16&255;t[G|18]=h>>>8&255;t[G|19]=h&255}function x(){d=1732584193;e=4023233417;f=2562383102;g=271733878;h=3285377520;i=0}function y(G,H,I,J,K,L){G=G|0;H=H|0;I=I|0;J=J|0;K=K|0;L=L|0;d=G;e=H;f=I;g=J;h=K;i=L}function z(G,H){G=G|0;H=H|0;var I=0;if(G&63)return-1;while((H|0)>=64){v(G);G=G+64|0;H=H-64|0;I=I+64|0}i=i+I|0;return I|0}function A(G,H,I){G=G|0;H=H|0;I=I|0;var J=0,K=0;if(G&63)return-1;if(~I)if(I&31)return-1;if((H|0)>=64){J=z(G,H)|0;if((J|0)==-1)return-1;G=G+J|0;H=H-J|0}J=J+H|0;i=i+H|0;t[G|H]=128;if((H|0)>=56){for(K=H+1|0;(K|0)<64;K=K+1|0)t[G|K]=0;v(G);H=0;t[G|0]=0}for(K=H+1|0;(K|0)<59;K=K+1|0)t[G|K]=0;t[G|59]=i>>>29;t[G|60]=i>>>21&255;t[G|61]=i>>>13&255;t[G|62]=i>>>5&255;t[G|63]=i<<3&255;v(G);if(~I)w(I);return J|0}function B(){d=j;e=k;f=l;g=m;h=n;i=64}function C(){d=o;e=p;f=q;g=r;h=s;i=64}function D(G,H,I,J,K,L,M,N,O,P,Q,R,S,T,U,V){G=G|0;H=H|0;I=I|0;J=J|0;K=K|0;L=L|0;M=M|0;N=N|0;O=O|0;P=P|0;Q=Q|0;R=R|0;S=S|0;T=T|0;U=U|0;V=V|0;x();u(G^1549556828,H^1549556828,I^1549556828,J^1549556828,K^1549556828,L^1549556828,M^1549556828,N^1549556828,O^1549556828,P^1549556828,Q^1549556828,R^1549556828,S^1549556828,T^1549556828,U^1549556828,V^1549556828);o=d;p=e;q=f;r=g;s=h;x();u(G^909522486,H^909522486,I^909522486,J^909522486,K^909522486,L^909522486,M^909522486,N^909522486,O^909522486,P^909522486,Q^909522486,R^909522486,S^909522486,T^909522486,U^909522486,V^909522486);j=d;k=e;l=f;m=g;n=h;i=64}function E(G,H,I){G=G|0;H=H|0;I=I|0;var J=0,K=0,L=0,M=0,N=0,O=0;if(G&63)return-1;if(~I)if(I&31)return-1;O=A(G,H,-1)|0;J=d,K=e,L=f,M=g,N=h;C();u(J,K,L,M,N,2147483648,0,0,0,0,0,0,0,0,0,672);if(~I)w(I);return O|0}function F(G,H,I,J,K){G=G|0;H=H|0;I=I|0;J=J|0;K=K|0;var L=0,M=0,N=0,O=0,P=0,Q=0,R=0,S=0,T=0,U=0;if(G&63)return-1;if(~K)if(K&31)return-1;t[G+H|0]=I>>>24;t[G+H+1|0]=I>>>16&255;t[G+H+2|0]=I>>>8&255;t[G+H+3|0]=I&255;E(G,H+4|0,-1)|0;L=Q=d,M=R=e,N=S=f,O=T=g,P=U=h;J=J-1|0;while((J|0)>0){B();u(Q,R,S,T,U,2147483648,0,0,0,0,0,0,0,0,0,672);Q=d,R=e,S=f,T=g,U=h;C();u(Q,R,S,T,U,2147483648,0,0,0,0,0,0,0,0,0,672);Q=d,R=e,S=f,T=g,U=h;L=L^d;M=M^e;N=N^f;O=O^g;P=P^h;J=J-1|0}d=L;e=M;f=N;g=O;h=P;if(~K)w(K);return 0}return{reset:x,init:y,process:z,finish:A,hmac_reset:B,hmac_init:D,hmac_finish:E,pbkdf2_generate_block:F}}function X(a){if(a=a||{},a.heapSize=a.heapSize||4096,a.heapSize<=0||a.heapSize%4096)throw new d("heapSize must be a positive number and multiple of 4096");this.heap=a.heap||new Uint8Array(a.heapSize),this.asm=a.asm||W(b,null,this.heap.buffer),this.BLOCK_SIZE=hd,this.HASH_SIZE=id,this.reset()}function Y(){return this.result=null,this.pos=0,this.len=0,this.asm.reset(),this}function Z(a){if(null!==this.result)throw new c("state must be reset before processing new data");if(n(a)&&(a=f(a)),o(a)&&(a=new Uint8Array(a)),!p(a))throw new TypeError("data isn't of expected type");for(var b=this.asm,d=this.heap,e=this.pos,g=this.len,h=0,i=a.length,j=0;i>0;)j=d.length-e-g,j=i>j?j:i,d.set(new Uint8Array(a.buffer||a,h,j),this.pos+this.len),d.set(a.subarray(h,h+j),e+g),g+=j,h+=j,i-=j,j=b.process(e,g),e+=j,g-=j,g||(e=0);return this.pos=e,this.len=g,this}function $(){if(null!==this.result)throw new c("state must be reset before processing new data");return this.asm.finish(this.pos,this.len,0),this.result=new Uint8Array(id),this.result.set(this.heap.subarray(0,id)),this.pos=0,this.len=0,this}function _(){return null===kd&&(kd=new X({heapSize:1048576})),kd}function ab(a){if(void 0===a)throw new SyntaxError("data required");return _().reset().process(a).finish().result}function bb(a){var b=ab(a);return j(b)}function cb(a){var b=ab(a);return k(b)}function db(a,b,c){"use asm";var d=0,e=0,f=0,g=0,h=0,i=0,j=0,k=0,l=0;var m=0,n=0,o=0,p=0,q=0,r=0,s=0,t=0,u=0,v=0,w=0,x=0,y=0,z=0,A=0,B=0;var C=new a.Uint8Array(c);function D(P,Q,R,S,T,U,V,W,X,Y,Z,$,_,ab,bb,cb){P=P|0;Q=Q|0;R=R|0;S=S|0;T=T|0;U=U|0;V=V|0;W=W|0;X=X|0;Y=Y|0;Z=Z|0;$=$|0;_=_|0;ab=ab|0;bb=bb|0;cb=cb|0;var db=0,eb=0,fb=0,gb=0,hb=0,ib=0,jb=0,kb=0,lb=0;db=d;eb=e;fb=f;gb=g;hb=h;ib=i;jb=j;kb=k;lb=P+kb+(hb>>>6^hb>>>11^hb>>>25^hb<<26^hb<<21^hb<<7)+(jb^hb&(ib^jb))+1116352408|0;kb=jb;jb=ib;ib=hb;hb=gb+lb|0;gb=fb;fb=eb;eb=db;db=lb+(eb&fb^gb&(eb^fb))+(eb>>>2^eb>>>13^eb>>>22^eb<<30^eb<<19^eb<<10)|0;lb=Q+kb+(hb>>>6^hb>>>11^hb>>>25^hb<<26^hb<<21^hb<<7)+(jb^hb&(ib^jb))+1899447441|0;kb=jb;jb=ib;ib=hb;hb=gb+lb|0;gb=fb;fb=eb;eb=db;db=lb+(eb&fb^gb&(eb^fb))+(eb>>>2^eb>>>13^eb>>>22^eb<<30^eb<<19^eb<<10)|0;lb=R+kb+(hb>>>6^hb>>>11^hb>>>25^hb<<26^hb<<21^hb<<7)+(jb^hb&(ib^jb))+3049323471|0;kb=jb;jb=ib;ib=hb;hb=gb+lb|0;gb=fb;fb=eb;eb=db;db=lb+(eb&fb^gb&(eb^fb))+(eb>>>2^eb>>>13^eb>>>22^eb<<30^eb<<19^eb<<10)|0;lb=S+kb+(hb>>>6^hb>>>11^hb>>>25^hb<<26^hb<<21^hb<<7)+(jb^hb&(ib^jb))+3921009573|0;kb=jb;jb=ib;ib=hb;hb=gb+lb|0;gb=fb;fb=eb;eb=db;db=lb+(eb&fb^gb&(eb^fb))+(eb>>>2^eb>>>13^eb>>>22^eb<<30^eb<<19^eb<<10)|0;lb=T+kb+(hb>>>6^hb>>>11^hb>>>25^hb<<26^hb<<21^hb<<7)+(jb^hb&(ib^jb))+961987163|0;kb=jb;jb=ib;ib=hb;hb=gb+lb|0;gb=fb;fb=eb;eb=db;db=lb+(eb&fb^gb&(eb^fb))+(eb>>>2^eb>>>13^eb>>>22^eb<<30^eb<<19^eb<<10)|0;lb=U+kb+(hb>>>6^hb>>>11^hb>>>25^hb<<26^hb<<21^hb<<7)+(jb^hb&(ib^jb))+1508970993|0;kb=jb;jb=ib;ib=hb;hb=gb+lb|0;gb=fb;fb=eb;eb=db;db=lb+(eb&fb^gb&(eb^fb))+(eb>>>2^eb>>>13^eb>>>22^eb<<30^eb<<19^eb<<10)|0;lb=V+kb+(hb>>>6^hb>>>11^hb>>>25^hb<<26^hb<<21^hb<<7)+(jb^hb&(ib^jb))+2453635748|0;kb=jb;jb=ib;ib=hb;hb=gb+lb|0;gb=fb;fb=eb;eb=db;db=lb+(eb&fb^gb&(eb^fb))+(eb>>>2^eb>>>13^eb>>>22^eb<<30^eb<<19^eb<<10)|0;lb=W+kb+(hb>>>6^hb>>>11^hb>>>25^hb<<26^hb<<21^hb<<7)+(jb^hb&(ib^jb))+2870763221|0;kb=jb;jb=ib;ib=hb;hb=gb+lb|0;gb=fb;fb=eb;eb=db;db=lb+(eb&fb^gb&(eb^fb))+(eb>>>2^eb>>>13^eb>>>22^eb<<30^eb<<19^eb<<10)|0;lb=X+kb+(hb>>>6^hb>>>11^hb>>>25^hb<<26^hb<<21^hb<<7)+(jb^hb&(ib^jb))+3624381080|0;kb=jb;jb=ib;ib=hb;hb=gb+lb|0;gb=fb;fb=eb;eb=db;db=lb+(eb&fb^gb&(eb^fb))+(eb>>>2^eb>>>13^eb>>>22^eb<<30^eb<<19^eb<<10)|0;lb=Y+kb+(hb>>>6^hb>>>11^hb>>>25^hb<<26^hb<<21^hb<<7)+(jb^hb&(ib^jb))+310598401|0;kb=jb;jb=ib;ib=hb;hb=gb+lb|0;gb=fb;fb=eb;eb=db;db=lb+(eb&fb^gb&(eb^fb))+(eb>>>2^eb>>>13^eb>>>22^eb<<30^eb<<19^eb<<10)|0;lb=Z+kb+(hb>>>6^hb>>>11^hb>>>25^hb<<26^hb<<21^hb<<7)+(jb^hb&(ib^jb))+607225278|0;kb=jb;jb=ib;ib=hb;hb=gb+lb|0;gb=fb;fb=eb;eb=db;db=lb+(eb&fb^gb&(eb^fb))+(eb>>>2^eb>>>13^eb>>>22^eb<<30^eb<<19^eb<<10)|0;lb=$+kb+(hb>>>6^hb>>>11^hb>>>25^hb<<26^hb<<21^hb<<7)+(jb^hb&(ib^jb))+1426881987|0;kb=jb;jb=ib;ib=hb;hb=gb+lb|0;gb=fb;fb=eb;eb=db;db=lb+(eb&fb^gb&(eb^fb))+(eb>>>2^eb>>>13^eb>>>22^eb<<30^eb<<19^eb<<10)|0;lb=_+kb+(hb>>>6^hb>>>11^hb>>>25^hb<<26^hb<<21^hb<<7)+(jb^hb&(ib^jb))+1925078388|0;kb=jb;jb=ib;ib=hb;hb=gb+lb|0;gb=fb;fb=eb;eb=db;db=lb+(eb&fb^gb&(eb^fb))+(eb>>>2^eb>>>13^eb>>>22^eb<<30^eb<<19^eb<<10)|0;lb=ab+kb+(hb>>>6^hb>>>11^hb>>>25^hb<<26^hb<<21^hb<<7)+(jb^hb&(ib^jb))+2162078206|0;kb=jb;jb=ib;ib=hb;hb=gb+lb|0;gb=fb;fb=eb;eb=db;db=lb+(eb&fb^gb&(eb^fb))+(eb>>>2^eb>>>13^eb>>>22^eb<<30^eb<<19^eb<<10)|0;lb=bb+kb+(hb>>>6^hb>>>11^hb>>>25^hb<<26^hb<<21^hb<<7)+(jb^hb&(ib^jb))+2614888103|0;kb=jb;jb=ib;ib=hb;hb=gb+lb|0;gb=fb;fb=eb;eb=db;db=lb+(eb&fb^gb&(eb^fb))+(eb>>>2^eb>>>13^eb>>>22^eb<<30^eb<<19^eb<<10)|0;lb=cb+kb+(hb>>>6^hb>>>11^hb>>>25^hb<<26^hb<<21^hb<<7)+(jb^hb&(ib^jb))+3248222580|0;kb=jb;jb=ib;ib=hb;hb=gb+lb|0;gb=fb;fb=eb;eb=db;db=lb+(eb&fb^gb&(eb^fb))+(eb>>>2^eb>>>13^eb>>>22^eb<<30^eb<<19^eb<<10)|0;P=lb=(Q>>>7^Q>>>18^Q>>>3^Q<<25^Q<<14)+(bb>>>17^bb>>>19^bb>>>10^bb<<15^bb<<13)+P+Y|0;lb=lb+kb+(hb>>>6^hb>>>11^hb>>>25^hb<<26^hb<<21^hb<<7)+(jb^hb&(ib^jb))+3835390401|0;kb=jb;jb=ib;ib=hb;hb=gb+lb|0;gb=fb;fb=eb;eb=db;db=lb+(eb&fb^gb&(eb^fb))+(eb>>>2^eb>>>13^eb>>>22^eb<<30^eb<<19^eb<<10)|0;Q=lb=(R>>>7^R>>>18^R>>>3^R<<25^R<<14)+(cb>>>17^cb>>>19^cb>>>10^cb<<15^cb<<13)+Q+Z|0;lb=lb+kb+(hb>>>6^hb>>>11^hb>>>25^hb<<26^hb<<21^hb<<7)+(jb^hb&(ib^jb))+4022224774|0;kb=jb;jb=ib;ib=hb;hb=gb+lb|0;gb=fb;fb=eb;eb=db;db=lb+(eb&fb^gb&(eb^fb))+(eb>>>2^eb>>>13^eb>>>22^eb<<30^eb<<19^eb<<10)|0;R=lb=(S>>>7^S>>>18^S>>>3^S<<25^S<<14)+(P>>>17^P>>>19^P>>>10^P<<15^P<<13)+R+$|0;lb=lb+kb+(hb>>>6^hb>>>11^hb>>>25^hb<<26^hb<<21^hb<<7)+(jb^hb&(ib^jb))+264347078|0;kb=jb;jb=ib;ib=hb;hb=gb+lb|0;gb=fb;fb=eb;eb=db;db=lb+(eb&fb^gb&(eb^fb))+(eb>>>2^eb>>>13^eb>>>22^eb<<30^eb<<19^eb<<10)|0;S=lb=(T>>>7^T>>>18^T>>>3^T<<25^T<<14)+(Q>>>17^Q>>>19^Q>>>10^Q<<15^Q<<13)+S+_|0;lb=lb+kb+(hb>>>6^hb>>>11^hb>>>25^hb<<26^hb<<21^hb<<7)+(jb^hb&(ib^jb))+604807628|0;kb=jb;jb=ib;ib=hb;hb=gb+lb|0;gb=fb;fb=eb;eb=db;db=lb+(eb&fb^gb&(eb^fb))+(eb>>>2^eb>>>13^eb>>>22^eb<<30^eb<<19^eb<<10)|0;T=lb=(U>>>7^U>>>18^U>>>3^U<<25^U<<14)+(R>>>17^R>>>19^R>>>10^R<<15^R<<13)+T+ab|0;lb=lb+kb+(hb>>>6^hb>>>11^hb>>>25^hb<<26^hb<<21^hb<<7)+(jb^hb&(ib^jb))+770255983|0;kb=jb;jb=ib;ib=hb;hb=gb+lb|0;gb=fb;fb=eb;eb=db;db=lb+(eb&fb^gb&(eb^fb))+(eb>>>2^eb>>>13^eb>>>22^eb<<30^eb<<19^eb<<10)|0;U=lb=(V>>>7^V>>>18^V>>>3^V<<25^V<<14)+(S>>>17^S>>>19^S>>>10^S<<15^S<<13)+U+bb|0;lb=lb+kb+(hb>>>6^hb>>>11^hb>>>25^hb<<26^hb<<21^hb<<7)+(jb^hb&(ib^jb))+1249150122|0;kb=jb;jb=ib;ib=hb;hb=gb+lb|0;gb=fb;fb=eb;eb=db;db=lb+(eb&fb^gb&(eb^fb))+(eb>>>2^eb>>>13^eb>>>22^eb<<30^eb<<19^eb<<10)|0;V=lb=(W>>>7^W>>>18^W>>>3^W<<25^W<<14)+(T>>>17^T>>>19^T>>>10^T<<15^T<<13)+V+cb|0;lb=lb+kb+(hb>>>6^hb>>>11^hb>>>25^hb<<26^hb<<21^hb<<7)+(jb^hb&(ib^jb))+1555081692|0;kb=jb;jb=ib;ib=hb;hb=gb+lb|0;gb=fb;fb=eb;eb=db;db=lb+(eb&fb^gb&(eb^fb))+(eb>>>2^eb>>>13^eb>>>22^eb<<30^eb<<19^eb<<10)|0;W=lb=(X>>>7^X>>>18^X>>>3^X<<25^X<<14)+(U>>>17^U>>>19^U>>>10^U<<15^U<<13)+W+P|0;lb=lb+kb+(hb>>>6^hb>>>11^hb>>>25^hb<<26^hb<<21^hb<<7)+(jb^hb&(ib^jb))+1996064986|0;kb=jb;jb=ib;ib=hb;hb=gb+lb|0;gb=fb;fb=eb;eb=db;db=lb+(eb&fb^gb&(eb^fb))+(eb>>>2^eb>>>13^eb>>>22^eb<<30^eb<<19^eb<<10)|0;X=lb=(Y>>>7^Y>>>18^Y>>>3^Y<<25^Y<<14)+(V>>>17^V>>>19^V>>>10^V<<15^V<<13)+X+Q|0;lb=lb+kb+(hb>>>6^hb>>>11^hb>>>25^hb<<26^hb<<21^hb<<7)+(jb^hb&(ib^jb))+2554220882|0;kb=jb;jb=ib;ib=hb;hb=gb+lb|0;gb=fb;fb=eb;eb=db;db=lb+(eb&fb^gb&(eb^fb))+(eb>>>2^eb>>>13^eb>>>22^eb<<30^eb<<19^eb<<10)|0;Y=lb=(Z>>>7^Z>>>18^Z>>>3^Z<<25^Z<<14)+(W>>>17^W>>>19^W>>>10^W<<15^W<<13)+Y+R|0;lb=lb+kb+(hb>>>6^hb>>>11^hb>>>25^hb<<26^hb<<21^hb<<7)+(jb^hb&(ib^jb))+2821834349|0;kb=jb;jb=ib;ib=hb;hb=gb+lb|0;gb=fb;fb=eb;eb=db;db=lb+(eb&fb^gb&(eb^fb))+(eb>>>2^eb>>>13^eb>>>22^eb<<30^eb<<19^eb<<10)|0;Z=lb=($>>>7^$>>>18^$>>>3^$<<25^$<<14)+(X>>>17^X>>>19^X>>>10^X<<15^X<<13)+Z+S|0;lb=lb+kb+(hb>>>6^hb>>>11^hb>>>25^hb<<26^hb<<21^hb<<7)+(jb^hb&(ib^jb))+2952996808|0;kb=jb;jb=ib;ib=hb;hb=gb+lb|0;gb=fb;fb=eb;eb=db;db=lb+(eb&fb^gb&(eb^fb))+(eb>>>2^eb>>>13^eb>>>22^eb<<30^eb<<19^eb<<10)|0;$=lb=(_>>>7^_>>>18^_>>>3^_<<25^_<<14)+(Y>>>17^Y>>>19^Y>>>10^Y<<15^Y<<13)+$+T|0;lb=lb+kb+(hb>>>6^hb>>>11^hb>>>25^hb<<26^hb<<21^hb<<7)+(jb^hb&(ib^jb))+3210313671|0;kb=jb;jb=ib;ib=hb;hb=gb+lb|0;gb=fb;fb=eb;eb=db;db=lb+(eb&fb^gb&(eb^fb))+(eb>>>2^eb>>>13^eb>>>22^eb<<30^eb<<19^eb<<10)|0;_=lb=(ab>>>7^ab>>>18^ab>>>3^ab<<25^ab<<14)+(Z>>>17^Z>>>19^Z>>>10^Z<<15^Z<<13)+_+U|0;lb=lb+kb+(hb>>>6^hb>>>11^hb>>>25^hb<<26^hb<<21^hb<<7)+(jb^hb&(ib^jb))+3336571891|0;kb=jb;jb=ib;ib=hb;hb=gb+lb|0;gb=fb;fb=eb;eb=db;db=lb+(eb&fb^gb&(eb^fb))+(eb>>>2^eb>>>13^eb>>>22^eb<<30^eb<<19^eb<<10)|0;ab=lb=(bb>>>7^bb>>>18^bb>>>3^bb<<25^bb<<14)+($>>>17^$>>>19^$>>>10^$<<15^$<<13)+ab+V|0;lb=lb+kb+(hb>>>6^hb>>>11^hb>>>25^hb<<26^hb<<21^hb<<7)+(jb^hb&(ib^jb))+3584528711|0;kb=jb;jb=ib;ib=hb;hb=gb+lb|0;gb=fb;fb=eb;eb=db;db=lb+(eb&fb^gb&(eb^fb))+(eb>>>2^eb>>>13^eb>>>22^eb<<30^eb<<19^eb<<10)|0;bb=lb=(cb>>>7^cb>>>18^cb>>>3^cb<<25^cb<<14)+(_>>>17^_>>>19^_>>>10^_<<15^_<<13)+bb+W|0;lb=lb+kb+(hb>>>6^hb>>>11^hb>>>25^hb<<26^hb<<21^hb<<7)+(jb^hb&(ib^jb))+113926993|0;kb=jb;jb=ib;ib=hb;hb=gb+lb|0;gb=fb;fb=eb;eb=db;db=lb+(eb&fb^gb&(eb^fb))+(eb>>>2^eb>>>13^eb>>>22^eb<<30^eb<<19^eb<<10)|0;cb=lb=(P>>>7^P>>>18^P>>>3^P<<25^P<<14)+(ab>>>17^ab>>>19^ab>>>10^ab<<15^ab<<13)+cb+X|0;lb=lb+kb+(hb>>>6^hb>>>11^hb>>>25^hb<<26^hb<<21^hb<<7)+(jb^hb&(ib^jb))+338241895|0;kb=jb;jb=ib;ib=hb;hb=gb+lb|0;gb=fb;fb=eb;eb=db;db=lb+(eb&fb^gb&(eb^fb))+(eb>>>2^eb>>>13^eb>>>22^eb<<30^eb<<19^eb<<10)|0;P=lb=(Q>>>7^Q>>>18^Q>>>3^Q<<25^Q<<14)+(bb>>>17^bb>>>19^bb>>>10^bb<<15^bb<<13)+P+Y|0;lb=lb+kb+(hb>>>6^hb>>>11^hb>>>25^hb<<26^hb<<21^hb<<7)+(jb^hb&(ib^jb))+666307205|0;kb=jb;jb=ib;ib=hb;hb=gb+lb|0;gb=fb;fb=eb;eb=db;db=lb+(eb&fb^gb&(eb^fb))+(eb>>>2^eb>>>13^eb>>>22^eb<<30^eb<<19^eb<<10)|0;Q=lb=(R>>>7^R>>>18^R>>>3^R<<25^R<<14)+(cb>>>17^cb>>>19^cb>>>10^cb<<15^cb<<13)+Q+Z|0;lb=lb+kb+(hb>>>6^hb>>>11^hb>>>25^hb<<26^hb<<21^hb<<7)+(jb^hb&(ib^jb))+773529912|0;kb=jb;jb=ib;ib=hb;hb=gb+lb|0;gb=fb;fb=eb;eb=db;db=lb+(eb&fb^gb&(eb^fb))+(eb>>>2^eb>>>13^eb>>>22^eb<<30^eb<<19^eb<<10)|0;R=lb=(S>>>7^S>>>18^S>>>3^S<<25^S<<14)+(P>>>17^P>>>19^P>>>10^P<<15^P<<13)+R+$|0;lb=lb+kb+(hb>>>6^hb>>>11^hb>>>25^hb<<26^hb<<21^hb<<7)+(jb^hb&(ib^jb))+1294757372|0;kb=jb;jb=ib;ib=hb;hb=gb+lb|0;gb=fb;fb=eb;eb=db;db=lb+(eb&fb^gb&(eb^fb))+(eb>>>2^eb>>>13^eb>>>22^eb<<30^eb<<19^eb<<10)|0;S=lb=(T>>>7^T>>>18^T>>>3^T<<25^T<<14)+(Q>>>17^Q>>>19^Q>>>10^Q<<15^Q<<13)+S+_|0;lb=lb+kb+(hb>>>6^hb>>>11^hb>>>25^hb<<26^hb<<21^hb<<7)+(jb^hb&(ib^jb))+1396182291|0;kb=jb;jb=ib;ib=hb;hb=gb+lb|0;gb=fb;fb=eb;eb=db;db=lb+(eb&fb^gb&(eb^fb))+(eb>>>2^eb>>>13^eb>>>22^eb<<30^eb<<19^eb<<10)|0;T=lb=(U>>>7^U>>>18^U>>>3^U<<25^U<<14)+(R>>>17^R>>>19^R>>>10^R<<15^R<<13)+T+ab|0;lb=lb+kb+(hb>>>6^hb>>>11^hb>>>25^hb<<26^hb<<21^hb<<7)+(jb^hb&(ib^jb))+1695183700|0;kb=jb;jb=ib;ib=hb;hb=gb+lb|0;gb=fb;fb=eb;eb=db;db=lb+(eb&fb^gb&(eb^fb))+(eb>>>2^eb>>>13^eb>>>22^eb<<30^eb<<19^eb<<10)|0;U=lb=(V>>>7^V>>>18^V>>>3^V<<25^V<<14)+(S>>>17^S>>>19^S>>>10^S<<15^S<<13)+U+bb|0;lb=lb+kb+(hb>>>6^hb>>>11^hb>>>25^hb<<26^hb<<21^hb<<7)+(jb^hb&(ib^jb))+1986661051|0;kb=jb;jb=ib;ib=hb;hb=gb+lb|0;gb=fb;fb=eb;eb=db;db=lb+(eb&fb^gb&(eb^fb))+(eb>>>2^eb>>>13^eb>>>22^eb<<30^eb<<19^eb<<10)|0;V=lb=(W>>>7^W>>>18^W>>>3^W<<25^W<<14)+(T>>>17^T>>>19^T>>>10^T<<15^T<<13)+V+cb|0;lb=lb+kb+(hb>>>6^hb>>>11^hb>>>25^hb<<26^hb<<21^hb<<7)+(jb^hb&(ib^jb))+2177026350|0;kb=jb;jb=ib;ib=hb;hb=gb+lb|0;gb=fb;fb=eb;eb=db;db=lb+(eb&fb^gb&(eb^fb))+(eb>>>2^eb>>>13^eb>>>22^eb<<30^eb<<19^eb<<10)|0;W=lb=(X>>>7^X>>>18^X>>>3^X<<25^X<<14)+(U>>>17^U>>>19^U>>>10^U<<15^U<<13)+W+P|0;lb=lb+kb+(hb>>>6^hb>>>11^hb>>>25^hb<<26^hb<<21^hb<<7)+(jb^hb&(ib^jb))+2456956037|0;kb=jb;jb=ib;ib=hb;hb=gb+lb|0;gb=fb;fb=eb;eb=db;db=lb+(eb&fb^gb&(eb^fb))+(eb>>>2^eb>>>13^eb>>>22^eb<<30^eb<<19^eb<<10)|0;X=lb=(Y>>>7^Y>>>18^Y>>>3^Y<<25^Y<<14)+(V>>>17^V>>>19^V>>>10^V<<15^V<<13)+X+Q|0;lb=lb+kb+(hb>>>6^hb>>>11^hb>>>25^hb<<26^hb<<21^hb<<7)+(jb^hb&(ib^jb))+2730485921|0;kb=jb;jb=ib;ib=hb;hb=gb+lb|0;gb=fb;fb=eb;eb=db;db=lb+(eb&fb^gb&(eb^fb))+(eb>>>2^eb>>>13^eb>>>22^eb<<30^eb<<19^eb<<10)|0;Y=lb=(Z>>>7^Z>>>18^Z>>>3^Z<<25^Z<<14)+(W>>>17^W>>>19^W>>>10^W<<15^W<<13)+Y+R|0;lb=lb+kb+(hb>>>6^hb>>>11^hb>>>25^hb<<26^hb<<21^hb<<7)+(jb^hb&(ib^jb))+2820302411|0;kb=jb;jb=ib;ib=hb;hb=gb+lb|0;gb=fb;fb=eb;eb=db;db=lb+(eb&fb^gb&(eb^fb))+(eb>>>2^eb>>>13^eb>>>22^eb<<30^eb<<19^eb<<10)|0;Z=lb=($>>>7^$>>>18^$>>>3^$<<25^$<<14)+(X>>>17^X>>>19^X>>>10^X<<15^X<<13)+Z+S|0;lb=lb+kb+(hb>>>6^hb>>>11^hb>>>25^hb<<26^hb<<21^hb<<7)+(jb^hb&(ib^jb))+3259730800|0;kb=jb;jb=ib;ib=hb;hb=gb+lb|0;gb=fb;fb=eb;eb=db;db=lb+(eb&fb^gb&(eb^fb))+(eb>>>2^eb>>>13^eb>>>22^eb<<30^eb<<19^eb<<10)|0;$=lb=(_>>>7^_>>>18^_>>>3^_<<25^_<<14)+(Y>>>17^Y>>>19^Y>>>10^Y<<15^Y<<13)+$+T|0;lb=lb+kb+(hb>>>6^hb>>>11^hb>>>25^hb<<26^hb<<21^hb<<7)+(jb^hb&(ib^jb))+3345764771|0;kb=jb;jb=ib;ib=hb;hb=gb+lb|0;gb=fb;fb=eb;eb=db;db=lb+(eb&fb^gb&(eb^fb))+(eb>>>2^eb>>>13^eb>>>22^eb<<30^eb<<19^eb<<10)|0;_=lb=(ab>>>7^ab>>>18^ab>>>3^ab<<25^ab<<14)+(Z>>>17^Z>>>19^Z>>>10^Z<<15^Z<<13)+_+U|0;lb=lb+kb+(hb>>>6^hb>>>11^hb>>>25^hb<<26^hb<<21^hb<<7)+(jb^hb&(ib^jb))+3516065817|0;kb=jb;jb=ib;ib=hb;hb=gb+lb|0;gb=fb;fb=eb;eb=db;db=lb+(eb&fb^gb&(eb^fb))+(eb>>>2^eb>>>13^eb>>>22^eb<<30^eb<<19^eb<<10)|0;ab=lb=(bb>>>7^bb>>>18^bb>>>3^bb<<25^bb<<14)+($>>>17^$>>>19^$>>>10^$<<15^$<<13)+ab+V|0;lb=lb+kb+(hb>>>6^hb>>>11^hb>>>25^hb<<26^hb<<21^hb<<7)+(jb^hb&(ib^jb))+3600352804|0;kb=jb;jb=ib;ib=hb;hb=gb+lb|0;gb=fb;fb=eb;eb=db;db=lb+(eb&fb^gb&(eb^fb))+(eb>>>2^eb>>>13^eb>>>22^eb<<30^eb<<19^eb<<10)|0;bb=lb=(cb>>>7^cb>>>18^cb>>>3^cb<<25^cb<<14)+(_>>>17^_>>>19^_>>>10^_<<15^_<<13)+bb+W|0;lb=lb+kb+(hb>>>6^hb>>>11^hb>>>25^hb<<26^hb<<21^hb<<7)+(jb^hb&(ib^jb))+4094571909|0;kb=jb;jb=ib;ib=hb;hb=gb+lb|0;gb=fb;fb=eb;eb=db;db=lb+(eb&fb^gb&(eb^fb))+(eb>>>2^eb>>>13^eb>>>22^eb<<30^eb<<19^eb<<10)|0;cb=lb=(P>>>7^P>>>18^P>>>3^P<<25^P<<14)+(ab>>>17^ab>>>19^ab>>>10^ab<<15^ab<<13)+cb+X|0;lb=lb+kb+(hb>>>6^hb>>>11^hb>>>25^hb<<26^hb<<21^hb<<7)+(jb^hb&(ib^jb))+275423344|0;kb=jb;jb=ib;ib=hb;hb=gb+lb|0;gb=fb;fb=eb;eb=db;db=lb+(eb&fb^gb&(eb^fb))+(eb>>>2^eb>>>13^eb>>>22^eb<<30^eb<<19^eb<<10)|0;P=lb=(Q>>>7^Q>>>18^Q>>>3^Q<<25^Q<<14)+(bb>>>17^bb>>>19^bb>>>10^bb<<15^bb<<13)+P+Y|0;lb=lb+kb+(hb>>>6^hb>>>11^hb>>>25^hb<<26^hb<<21^hb<<7)+(jb^hb&(ib^jb))+430227734|0;kb=jb;jb=ib;ib=hb;hb=gb+lb|0;gb=fb;fb=eb;eb=db;db=lb+(eb&fb^gb&(eb^fb))+(eb>>>2^eb>>>13^eb>>>22^eb<<30^eb<<19^eb<<10)|0;Q=lb=(R>>>7^R>>>18^R>>>3^R<<25^R<<14)+(cb>>>17^cb>>>19^cb>>>10^cb<<15^cb<<13)+Q+Z|0;lb=lb+kb+(hb>>>6^hb>>>11^hb>>>25^hb<<26^hb<<21^hb<<7)+(jb^hb&(ib^jb))+506948616|0;kb=jb;jb=ib;ib=hb;hb=gb+lb|0;gb=fb;fb=eb;eb=db;db=lb+(eb&fb^gb&(eb^fb))+(eb>>>2^eb>>>13^eb>>>22^eb<<30^eb<<19^eb<<10)|0;R=lb=(S>>>7^S>>>18^S>>>3^S<<25^S<<14)+(P>>>17^P>>>19^P>>>10^P<<15^P<<13)+R+$|0;lb=lb+kb+(hb>>>6^hb>>>11^hb>>>25^hb<<26^hb<<21^hb<<7)+(jb^hb&(ib^jb))+659060556|0;kb=jb;jb=ib;ib=hb;hb=gb+lb|0;gb=fb;fb=eb;eb=db;db=lb+(eb&fb^gb&(eb^fb))+(eb>>>2^eb>>>13^eb>>>22^eb<<30^eb<<19^eb<<10)|0;S=lb=(T>>>7^T>>>18^T>>>3^T<<25^T<<14)+(Q>>>17^Q>>>19^Q>>>10^Q<<15^Q<<13)+S+_|0;lb=lb+kb+(hb>>>6^hb>>>11^hb>>>25^hb<<26^hb<<21^hb<<7)+(jb^hb&(ib^jb))+883997877|0;kb=jb;jb=ib;ib=hb;hb=gb+lb|0;gb=fb;fb=eb;eb=db;db=lb+(eb&fb^gb&(eb^fb))+(eb>>>2^eb>>>13^eb>>>22^eb<<30^eb<<19^eb<<10)|0;T=lb=(U>>>7^U>>>18^U>>>3^U<<25^U<<14)+(R>>>17^R>>>19^R>>>10^R<<15^R<<13)+T+ab|0;lb=lb+kb+(hb>>>6^hb>>>11^hb>>>25^hb<<26^hb<<21^hb<<7)+(jb^hb&(ib^jb))+958139571|0;kb=jb;jb=ib;ib=hb;hb=gb+lb|0;gb=fb;fb=eb;eb=db;db=lb+(eb&fb^gb&(eb^fb))+(eb>>>2^eb>>>13^eb>>>22^eb<<30^eb<<19^eb<<10)|0;U=lb=(V>>>7^V>>>18^V>>>3^V<<25^V<<14)+(S>>>17^S>>>19^S>>>10^S<<15^S<<13)+U+bb|0;lb=lb+kb+(hb>>>6^hb>>>11^hb>>>25^hb<<26^hb<<21^hb<<7)+(jb^hb&(ib^jb))+1322822218|0;kb=jb;jb=ib;ib=hb;hb=gb+lb|0;gb=fb;fb=eb;eb=db;db=lb+(eb&fb^gb&(eb^fb))+(eb>>>2^eb>>>13^eb>>>22^eb<<30^eb<<19^eb<<10)|0;V=lb=(W>>>7^W>>>18^W>>>3^W<<25^W<<14)+(T>>>17^T>>>19^T>>>10^T<<15^T<<13)+V+cb|0;lb=lb+kb+(hb>>>6^hb>>>11^hb>>>25^hb<<26^hb<<21^hb<<7)+(jb^hb&(ib^jb))+1537002063|0;kb=jb;jb=ib;ib=hb;hb=gb+lb|0;gb=fb;fb=eb;eb=db;db=lb+(eb&fb^gb&(eb^fb))+(eb>>>2^eb>>>13^eb>>>22^eb<<30^eb<<19^eb<<10)|0;W=lb=(X>>>7^X>>>18^X>>>3^X<<25^X<<14)+(U>>>17^U>>>19^U>>>10^U<<15^U<<13)+W+P|0;lb=lb+kb+(hb>>>6^hb>>>11^hb>>>25^hb<<26^hb<<21^hb<<7)+(jb^hb&(ib^jb))+1747873779|0;kb=jb;jb=ib;ib=hb;hb=gb+lb|0;gb=fb;fb=eb;eb=db;db=lb+(eb&fb^gb&(eb^fb))+(eb>>>2^eb>>>13^eb>>>22^eb<<30^eb<<19^eb<<10)|0;X=lb=(Y>>>7^Y>>>18^Y>>>3^Y<<25^Y<<14)+(V>>>17^V>>>19^V>>>10^V<<15^V<<13)+X+Q|0;lb=lb+kb+(hb>>>6^hb>>>11^hb>>>25^hb<<26^hb<<21^hb<<7)+(jb^hb&(ib^jb))+1955562222|0;kb=jb;jb=ib;ib=hb;hb=gb+lb|0;gb=fb;fb=eb;eb=db;db=lb+(eb&fb^gb&(eb^fb))+(eb>>>2^eb>>>13^eb>>>22^eb<<30^eb<<19^eb<<10)|0;Y=lb=(Z>>>7^Z>>>18^Z>>>3^Z<<25^Z<<14)+(W>>>17^W>>>19^W>>>10^W<<15^W<<13)+Y+R|0;lb=lb+kb+(hb>>>6^hb>>>11^hb>>>25^hb<<26^hb<<21^hb<<7)+(jb^hb&(ib^jb))+2024104815|0;kb=jb;jb=ib;ib=hb;hb=gb+lb|0;gb=fb;fb=eb;eb=db;db=lb+(eb&fb^gb&(eb^fb))+(eb>>>2^eb>>>13^eb>>>22^eb<<30^eb<<19^eb<<10)|0;Z=lb=($>>>7^$>>>18^$>>>3^$<<25^$<<14)+(X>>>17^X>>>19^X>>>10^X<<15^X<<13)+Z+S|0;lb=lb+kb+(hb>>>6^hb>>>11^hb>>>25^hb<<26^hb<<21^hb<<7)+(jb^hb&(ib^jb))+2227730452|0;kb=jb;jb=ib;ib=hb;hb=gb+lb|0;gb=fb;fb=eb;eb=db;db=lb+(eb&fb^gb&(eb^fb))+(eb>>>2^eb>>>13^eb>>>22^eb<<30^eb<<19^eb<<10)|0;$=lb=(_>>>7^_>>>18^_>>>3^_<<25^_<<14)+(Y>>>17^Y>>>19^Y>>>10^Y<<15^Y<<13)+$+T|0;lb=lb+kb+(hb>>>6^hb>>>11^hb>>>25^hb<<26^hb<<21^hb<<7)+(jb^hb&(ib^jb))+2361852424|0;kb=jb;jb=ib;ib=hb;hb=gb+lb|0;gb=fb;fb=eb;eb=db;db=lb+(eb&fb^gb&(eb^fb))+(eb>>>2^eb>>>13^eb>>>22^eb<<30^eb<<19^eb<<10)|0;_=lb=(ab>>>7^ab>>>18^ab>>>3^ab<<25^ab<<14)+(Z>>>17^Z>>>19^Z>>>10^Z<<15^Z<<13)+_+U|0;lb=lb+kb+(hb>>>6^hb>>>11^hb>>>25^hb<<26^hb<<21^hb<<7)+(jb^hb&(ib^jb))+2428436474|0;kb=jb;jb=ib;ib=hb;hb=gb+lb|0;gb=fb;fb=eb;eb=db;db=lb+(eb&fb^gb&(eb^fb))+(eb>>>2^eb>>>13^eb>>>22^eb<<30^eb<<19^eb<<10)|0;ab=lb=(bb>>>7^bb>>>18^bb>>>3^bb<<25^bb<<14)+($>>>17^$>>>19^$>>>10^$<<15^$<<13)+ab+V|0;lb=lb+kb+(hb>>>6^hb>>>11^hb>>>25^hb<<26^hb<<21^hb<<7)+(jb^hb&(ib^jb))+2756734187|0;kb=jb;jb=ib;ib=hb;hb=gb+lb|0;gb=fb;fb=eb;eb=db;db=lb+(eb&fb^gb&(eb^fb))+(eb>>>2^eb>>>13^eb>>>22^eb<<30^eb<<19^eb<<10)|0;bb=lb=(cb>>>7^cb>>>18^cb>>>3^cb<<25^cb<<14)+(_>>>17^_>>>19^_>>>10^_<<15^_<<13)+bb+W|0;lb=lb+kb+(hb>>>6^hb>>>11^hb>>>25^hb<<26^hb<<21^hb<<7)+(jb^hb&(ib^jb))+3204031479|0;kb=jb;jb=ib;ib=hb;hb=gb+lb|0;gb=fb;fb=eb;eb=db;db=lb+(eb&fb^gb&(eb^fb))+(eb>>>2^eb>>>13^eb>>>22^eb<<30^eb<<19^eb<<10)|0;cb=lb=(P>>>7^P>>>18^P>>>3^P<<25^P<<14)+(ab>>>17^ab>>>19^ab>>>10^ab<<15^ab<<13)+cb+X|0;lb=lb+kb+(hb>>>6^hb>>>11^hb>>>25^hb<<26^hb<<21^hb<<7)+(jb^hb&(ib^jb))+3329325298|0;kb=jb;jb=ib;ib=hb;hb=gb+lb|0;gb=fb;fb=eb;eb=db;db=lb+(eb&fb^gb&(eb^fb))+(eb>>>2^eb>>>13^eb>>>22^eb<<30^eb<<19^eb<<10)|0;d=d+db|0;e=e+eb|0;f=f+fb|0;g=g+gb|0;h=h+hb|0;i=i+ib|0;j=j+jb|0;k=k+kb|0}function E(P){P=P|0;D(C[P|0]<<24|C[P|1]<<16|C[P|2]<<8|C[P|3],C[P|4]<<24|C[P|5]<<16|C[P|6]<<8|C[P|7],C[P|8]<<24|C[P|9]<<16|C[P|10]<<8|C[P|11],C[P|12]<<24|C[P|13]<<16|C[P|14]<<8|C[P|15],C[P|16]<<24|C[P|17]<<16|C[P|18]<<8|C[P|19],C[P|20]<<24|C[P|21]<<16|C[P|22]<<8|C[P|23],C[P|24]<<24|C[P|25]<<16|C[P|26]<<8|C[P|27],C[P|28]<<24|C[P|29]<<16|C[P|30]<<8|C[P|31],C[P|32]<<24|C[P|33]<<16|C[P|34]<<8|C[P|35],C[P|36]<<24|C[P|37]<<16|C[P|38]<<8|C[P|39],C[P|40]<<24|C[P|41]<<16|C[P|42]<<8|C[P|43],C[P|44]<<24|C[P|45]<<16|C[P|46]<<8|C[P|47],C[P|48]<<24|C[P|49]<<16|C[P|50]<<8|C[P|51],C[P|52]<<24|C[P|53]<<16|C[P|54]<<8|C[P|55],C[P|56]<<24|C[P|57]<<16|C[P|58]<<8|C[P|59],C[P|60]<<24|C[P|61]<<16|C[P|62]<<8|C[P|63])}function F(P){P=P|0;C[P|0]=d>>>24;C[P|1]=d>>>16&255;C[P|2]=d>>>8&255;C[P|3]=d&255;C[P|4]=e>>>24;C[P|5]=e>>>16&255;C[P|6]=e>>>8&255;C[P|7]=e&255;C[P|8]=f>>>24;C[P|9]=f>>>16&255;C[P|10]=f>>>8&255;C[P|11]=f&255;C[P|12]=g>>>24;C[P|13]=g>>>16&255;C[P|14]=g>>>8&255;C[P|15]=g&255;C[P|16]=h>>>24;C[P|17]=h>>>16&255;C[P|18]=h>>>8&255;C[P|19]=h&255;C[P|20]=i>>>24;C[P|21]=i>>>16&255;C[P|22]=i>>>8&255;C[P|23]=i&255;C[P|24]=j>>>24;C[P|25]=j>>>16&255;C[P|26]=j>>>8&255;C[P|27]=j&255;C[P|28]=k>>>24;C[P|29]=k>>>16&255;C[P|30]=k>>>8&255;C[P|31]=k&255}function G(){d=1779033703;e=3144134277;f=1013904242;g=2773480762;h=1359893119;i=2600822924;j=528734635;k=1541459225;l=0}function H(P,Q,R,S,T,U,V,W,X){P=P|0;Q=Q|0;R=R|0;S=S|0;T=T|0;U=U|0;V=V|0;W=W|0;X=X|0;d=P;e=Q;f=R;g=S;h=T;i=U;j=V;k=W;l=X}function I(P,Q){P=P|0;Q=Q|0;var R=0;if(P&63)return-1;while((Q|0)>=64){E(P);P=P+64|0;Q=Q-64|0;R=R+64|0}l=l+R|0;return R|0}function J(P,Q,R){P=P|0;Q=Q|0;R=R|0;var S=0,T=0;if(P&63)return-1;if(~R)if(R&31)return-1;if((Q|0)>=64){S=I(P,Q)|0;if((S|0)==-1)return-1;P=P+S|0;Q=Q-S|0}S=S+Q|0;l=l+Q|0;C[P|Q]=128;if((Q|0)>=56){for(T=Q+1|0;(T|0)<64;T=T+1|0)C[P|T]=0;E(P);Q=0;C[P|0]=0}for(T=Q+1|0;(T|0)<59;T=T+1|0)C[P|T]=0;C[P|59]=l>>>29;C[P|60]=l>>>21&255;C[P|61]=l>>>13&255;C[P|62]=l>>>5&255;C[P|63]=l<<3&255;E(P);if(~R)F(R);return S|0}function K(){d=m;e=n;f=o;g=p;h=q;i=r;j=s;k=t;l=64}function L(){d=u;e=v;f=w;g=x;h=y;i=z;j=A;k=B;l=64}function M(P,Q,R,S,T,U,V,W,X,Y,Z,$,_,ab,bb,cb){P=P|0;Q=Q|0;R=R|0;S=S|0;T=T|0;U=U|0;V=V|0;W=W|0;X=X|0;Y=Y|0;Z=Z|0;$=$|0;_=_|0;ab=ab|0;bb=bb|0;cb=cb|0;G();D(P^1549556828,Q^1549556828,R^1549556828,S^1549556828,T^1549556828,U^1549556828,V^1549556828,W^1549556828,X^1549556828,Y^1549556828,Z^1549556828,$^1549556828,_^1549556828,ab^1549556828,bb^1549556828,cb^1549556828);u=d;v=e;w=f;x=g;y=h;z=i;A=j;B=k;G();D(P^909522486,Q^909522486,R^909522486,S^909522486,T^909522486,U^909522486,V^909522486,W^909522486,X^909522486,Y^909522486,Z^909522486,$^909522486,_^909522486,ab^909522486,bb^909522486,cb^909522486);m=d;n=e;o=f;p=g;q=h;r=i;s=j;t=k;l=64}function N(P,Q,R){P=P|0;Q=Q|0;R=R|0;var S=0,T=0,U=0,V=0,W=0,X=0,Y=0,Z=0,$=0;if(P&63)return-1;if(~R)if(R&31)return-1;$=J(P,Q,-1)|0;S=d,T=e,U=f,V=g,W=h,X=i,Y=j,Z=k;L();D(S,T,U,V,W,X,Y,Z,2147483648,0,0,0,0,0,0,768);if(~R)F(R);return $|0}function O(P,Q,R,S,T){P=P|0;Q=Q|0;R=R|0;S=S|0;T=T|0;var U=0,V=0,W=0,X=0,Y=0,Z=0,$=0,_=0,ab=0,bb=0,cb=0,db=0,eb=0,fb=0,gb=0,hb=0;if(P&63)return-1;if(~T)if(T&31)return-1;C[P+Q|0]=R>>>24;C[P+Q+1|0]=R>>>16&255;C[P+Q+2|0]=R>>>8&255;C[P+Q+3|0]=R&255;N(P,Q+4|0,-1)|0;U=ab=d,V=bb=e,W=cb=f,X=db=g,Y=eb=h,Z=fb=i,$=gb=j,_=hb=k;S=S-1|0;while((S|0)>0){K();D(ab,bb,cb,db,eb,fb,gb,hb,2147483648,0,0,0,0,0,0,768);ab=d,bb=e,cb=f,db=g,eb=h,fb=i,gb=j,hb=k;L();D(ab,bb,cb,db,eb,fb,gb,hb,2147483648,0,0,0,0,0,0,768);ab=d,bb=e,cb=f,db=g,eb=h,fb=i,gb=j,hb=k;U=U^d;V=V^e;W=W^f;X=X^g;Y=Y^h;Z=Z^i;$=$^j;_=_^k;S=S-1|0}d=U;e=V;f=W;g=X;h=Y;i=Z;j=$;k=_;if(~T)F(T);return 0}return{reset:G,init:H,process:I,finish:J,hmac_reset:K,hmac_init:M,hmac_finish:N,pbkdf2_generate_block:O}}function eb(a){if(a=a||{},a.heapSize=a.heapSize||4096,a.heapSize<=0||a.heapSize%4096)throw new d("heapSize must be a positive number and multiple of 4096");this.heap=a.heap||new Uint8Array(a.heapSize),this.asm=a.asm||db(b,null,this.heap.buffer),this.BLOCK_SIZE=ld,this.HASH_SIZE=md,this.reset()}function fb(){return this.result=null,this.pos=0,this.len=0,this.asm.reset(),this}function gb(a){if(null!==this.result)throw new c("state must be reset before processing new data");if(n(a)&&(a=f(a)),o(a)&&(a=new Uint8Array(a)),!p(a))throw new TypeError("data isn't of expected type");for(var b=this.asm,d=this.heap,e=this.pos,g=this.len,h=0,i=a.length,j=0;i>0;)j=d.length-e-g,j=i>j?j:i,d.set(new Uint8Array(a.buffer||a,h,j),this.pos+this.len),d.set(a.subarray(h,h+j),e+g),g+=j,h+=j,i-=j,j=b.process(e,g),e+=j,g-=j,g||(e=0);return this.pos=e,this.len=g,this}function hb(){if(null!==this.result)throw new c("state must be reset before processing new data");return this.asm.finish(this.pos,this.len,0),this.result=new Uint8Array(md),this.result.set(this.heap.subarray(0,md)),this.pos=0,this.len=0,this}function ib(){return null===od&&(od=new eb({heapSize:1048576})),od}function jb(a){if(void 0===a)throw new SyntaxError("data required");return ib().reset().process(a).finish().result}function kb(a){var b=jb(a);return j(b)}function lb(a){var b=jb(a);return k(b)}function mb(a){if(a=a||{},!a.hash)throw new SyntaxError("option 'hash' is required");if(!a.hash.HASH_SIZE)throw new SyntaxError("option 'hash' supplied doesn't seem to be a valid hash function");return this.hash=a.hash,this.BLOCK_SIZE=this.hash.BLOCK_SIZE,this.HMAC_SIZE=this.hash.HASH_SIZE,this.key=null,this.verify=null,this.result=null,(void 0!==a.password||void 0!==a.verify)&&this.reset(a),this}function nb(a,b){if(o(b)&&(b=new Uint8Array(b)),n(b)&&(b=f(b)),!p(b))throw new TypeError("password isn't of expected type");var c=new Uint8Array(a.BLOCK_SIZE);return c.set(b.length>a.BLOCK_SIZE?a.reset().process(b).finish().result:b),c}function ob(a){if(o(a)||p(a))a=new Uint8Array(a);else{if(!n(a))throw new TypeError("verify tag isn't of expected type");a=f(a)}if(a.length!==this.HMAC_SIZE)throw new d("illegal verification tag size");this.verify=a}function pb(a){a=a||{};var b=a.password;if(null===this.key&&!n(b)&&!b)throw new c("no key is associated with the instance");this.result=null,this.hash.reset(),(b||n(b))&&(this.key=nb(this.hash,b));for(var d=new Uint8Array(this.key),e=0;e<d.length;++e)d[e]^=54;this.hash.process(d);var f=a.verify;return void 0!==f?ob.call(this,f):this.verify=null,this}function qb(a){if(null===this.key)throw new c("no key is associated with the instance");if(null!==this.result)throw new c("state must be reset before processing new data");return this.hash.process(a),this}function rb(){if(null===this.key)throw new c("no key is associated with the instance");if(null!==this.result)throw new c("state must be reset before processing new data");for(var a=this.hash.finish().result,b=new Uint8Array(this.key),d=0;d<b.length;++d)b[d]^=92;var e=this.verify,f=this.hash.reset().process(b).process(a).finish().result;if(e)if(e.length===f.length){for(var g=0,d=0;d<e.length;d++)g|=e[d]^f[d];this.result=!g}else this.result=!1;else this.result=f;return this}function sb(a){return a=a||{},a.hash instanceof X||(a.hash=_()),mb.call(this,a),this}function tb(a){a=a||{},this.result=null,this.hash.reset();var b=a.password;if(void 0!==b){n(b)&&(b=f(b));var c=this.key=nb(this.hash,b);this.hash.reset().asm.hmac_init(c[0]<<24|c[1]<<16|c[2]<<8|c[3],c[4]<<24|c[5]<<16|c[6]<<8|c[7],c[8]<<24|c[9]<<16|c[10]<<8|c[11],c[12]<<24|c[13]<<16|c[14]<<8|c[15],c[16]<<24|c[17]<<16|c[18]<<8|c[19],c[20]<<24|c[21]<<16|c[22]<<8|c[23],c[24]<<24|c[25]<<16|c[26]<<8|c[27],c[28]<<24|c[29]<<16|c[30]<<8|c[31],c[32]<<24|c[33]<<16|c[34]<<8|c[35],c[36]<<24|c[37]<<16|c[38]<<8|c[39],c[40]<<24|c[41]<<16|c[42]<<8|c[43],c[44]<<24|c[45]<<16|c[46]<<8|c[47],c[48]<<24|c[49]<<16|c[50]<<8|c[51],c[52]<<24|c[53]<<16|c[54]<<8|c[55],c[56]<<24|c[57]<<16|c[58]<<8|c[59],c[60]<<24|c[61]<<16|c[62]<<8|c[63])}else this.hash.asm.hmac_reset();var d=a.verify;return void 0!==d?ob.call(this,d):this.verify=null,this}function ub(){if(null===this.key)throw new c("no key is associated with the instance");if(null!==this.result)throw new c("state must be reset before processing new data");var a=this.hash,b=this.hash.asm,d=this.hash.heap;b.hmac_finish(a.pos,a.len,0);var e=this.verify,f=new Uint8Array(id);if(f.set(d.subarray(0,id)),e)if(e.length===f.length){for(var g=0,h=0;h<e.length;h++)g|=e[h]^f[h];this.result=!g}else this.result=!1;else this.result=f;return this}function vb(){return null===rd&&(rd=new sb),rd}function wb(a){return a=a||{},a.hash instanceof eb||(a.hash=ib()),mb.call(this,a),this}function xb(a){a=a||{},this.result=null,this.hash.reset();var b=a.password;if(void 0!==b){n(b)&&(b=f(b));var c=this.key=nb(this.hash,b);this.hash.reset().asm.hmac_init(c[0]<<24|c[1]<<16|c[2]<<8|c[3],c[4]<<24|c[5]<<16|c[6]<<8|c[7],c[8]<<24|c[9]<<16|c[10]<<8|c[11],c[12]<<24|c[13]<<16|c[14]<<8|c[15],c[16]<<24|c[17]<<16|c[18]<<8|c[19],c[20]<<24|c[21]<<16|c[22]<<8|c[23],c[24]<<24|c[25]<<16|c[26]<<8|c[27],c[28]<<24|c[29]<<16|c[30]<<8|c[31],c[32]<<24|c[33]<<16|c[34]<<8|c[35],c[36]<<24|c[37]<<16|c[38]<<8|c[39],c[40]<<24|c[41]<<16|c[42]<<8|c[43],c[44]<<24|c[45]<<16|c[46]<<8|c[47],c[48]<<24|c[49]<<16|c[50]<<8|c[51],c[52]<<24|c[53]<<16|c[54]<<8|c[55],c[56]<<24|c[57]<<16|c[58]<<8|c[59],c[60]<<24|c[61]<<16|c[62]<<8|c[63])}else this.hash.asm.hmac_reset();var d=a.verify;return void 0!==d?ob.call(this,d):this.verify=null,this}function yb(){if(null===this.key)throw new c("no key is associated with the instance");if(null!==this.result)throw new c("state must be reset before processing new data");var a=this.hash,b=this.hash.asm,d=this.hash.heap;b.hmac_finish(a.pos,a.len,0);var e=this.verify,f=new Uint8Array(md);if(f.set(d.subarray(0,md)),e)if(e.length===f.length){for(var g=0,h=0;h<e.length;h++)g|=e[h]^f[h];this.result=!g}else this.result=!1;else this.result=f;return this}function zb(){return null===td&&(td=new wb),td}function Ab(a,b){if(void 0===a)throw new SyntaxError("data required");if(void 0===b)throw new SyntaxError("password required");return vb().reset({password:b}).process(a).finish().result}function Bb(a,b){var c=Ab(a,b);return j(c)}function Cb(a,b){var c=Ab(a,b);return k(c)}function Db(a,b){if(void 0===a)throw new SyntaxError("data required");if(void 0===b)throw new SyntaxError("password required");return zb().reset({password:b}).process(a).finish().result}function Eb(a,b){var c=Db(a,b);return j(c)}function Fb(a,b){var c=Db(a,b);return k(c)}function Gb(a){if(a=a||{},!a.hmac)throw new SyntaxError("option 'hmac' is required");if(!a.hmac.HMAC_SIZE)throw new SyntaxError("option 'hmac' supplied doesn't seem to be a valid HMAC function");this.hmac=a.hmac,this.count=a.count||4096,this.length=a.length||this.hmac.HMAC_SIZE,this.result=null;var b=a.password;return(b||n(b))&&this.reset(a),this}function Hb(a){return this.result=null,this.hmac.reset(a),this}function Ib(a,b,e){if(null!==this.result)throw new c("state must be reset before processing new data");if(!a&&!n(a))throw new d("bad 'salt' value");b=b||this.count,e=e||this.length,this.result=new Uint8Array(e);for(var f=Math.ceil(e/this.hmac.HMAC_SIZE),g=1;f>=g;++g){var h=(g-1)*this.hmac.HMAC_SIZE,i=(f>g?0:e%this.hmac.HMAC_SIZE)||this.hmac.HMAC_SIZE,j=new Uint8Array(this.hmac.reset().process(a).process(new Uint8Array([g>>>24&255,g>>>16&255,g>>>8&255,255&g])).finish().result);this.result.set(j.subarray(0,i),h);for(var k=1;b>k;++k){j=new Uint8Array(this.hmac.reset().process(j).finish().result);for(var l=0;i>l;++l)this.result[h+l]^=j[l]}}return this}function Jb(a){return a=a||{},a.hmac instanceof sb||(a.hmac=vb()),Gb.call(this,a),this}function Kb(a,b,e){if(null!==this.result)throw new c("state must be reset before processing new data");if(!a&&!n(a))throw new d("bad 'salt' value");b=b||this.count,e=e||this.length,this.result=new Uint8Array(e);for(var f=Math.ceil(e/this.hmac.HMAC_SIZE),g=1;f>=g;++g){var h=(g-1)*this.hmac.HMAC_SIZE,i=(f>g?0:e%this.hmac.HMAC_SIZE)||this.hmac.HMAC_SIZE;this.hmac.reset().process(a),this.hmac.hash.asm.pbkdf2_generate_block(this.hmac.hash.pos,this.hmac.hash.len,g,b,0),this.result.set(this.hmac.hash.heap.subarray(0,i),h)}return this}function Lb(){return null===wd&&(wd=new Jb),wd}function Mb(a){return a=a||{},a.hmac instanceof wb||(a.hmac=zb()),Gb.call(this,a),this}function Nb(a,b,e){if(null!==this.result)throw new c("state must be reset before processing new data");if(!a&&!n(a))throw new d("bad 'salt' value");b=b||this.count,e=e||this.length,this.result=new Uint8Array(e);for(var f=Math.ceil(e/this.hmac.HMAC_SIZE),g=1;f>=g;++g){var h=(g-1)*this.hmac.HMAC_SIZE,i=(f>g?0:e%this.hmac.HMAC_SIZE)||this.hmac.HMAC_SIZE;this.hmac.reset().process(a),this.hmac.hash.asm.pbkdf2_generate_block(this.hmac.hash.pos,this.hmac.hash.len,g,b,0),this.result.set(this.hmac.hash.heap.subarray(0,i),h)}return this}function Ob(){return null===yd&&(yd=new Mb),yd}function Pb(a,b,c,d){if(void 0===a)throw new SyntaxError("password required");if(void 0===b)throw new SyntaxError("salt required");return Lb().reset({password:a}).generate(b,c,d).result}function Qb(a,b,c,d){var e=Pb(a,b,c,d);return j(e)}function Rb(a,b,c,d){var e=Pb(a,b,c,d);return k(e)}function Sb(a,b,c,d){if(void 0===a)throw new SyntaxError("password required");if(void 0===b)throw new SyntaxError("salt required");return Ob().reset({password:a}).generate(b,c,d).result}function Tb(a,b,c,d){var e=Sb(a,b,c,d);return j(e)}function Ub(a,b,c,d){var e=Sb(a,b,c,d);return k(e)}function Vb(){if(void 0!==Fd)d=new Uint8Array(32),zd.call(Fd,d),Id(d);else{var a,c,d=new Vc(3);d[0]=Dd(),d[1]=Cd(),d[2]=Gd(),d=new Uint8Array(d.buffer);var e=Ob();for(a=0;100>a;a++)d=e.reset({password:d}).generate(b.location.href,1e3,32).result,c=Gd(),d[0]^=c>>>24,d[1]^=c>>>16,d[2]^=c>>>8,d[3]^=c;Id(d)}Jd=0,Kd=!0}function Wb(a){if(!o(a)&&!q(a))throw new TypeError("bad seed type");var b=a.byteOffest||0,c=a.byteLength||a.length,d=new Uint8Array(a.buffer||a,b,c);Id(d),Jd=0;for(var e=0,f=0;f<d.length;f++)e|=d[f],d[f]=0;return 0!==e&&(Md+=4*c),Ld=Md>=Nd}function Xb(a){if(Kd||Vb(),!Ld&&void 0===Fd){if(!Od)throw new e("No strong PRNGs available. Use asmCrypto.random.seed().");void 0!==Bd&&Bd.error("No strong PRNGs available; your security is greatly lowered. Use asmCrypto.random.seed().")}if(!Pd&&!Ld&&void 0!==Fd&&void 0!==Bd){var b=(new Error).stack;Qd[b]|=0,Qd[b]++||Bd.warn("asmCrypto PRNG not seeded; your security relies on your system PRNG. If this is not acceptable, use asmCrypto.random.seed().")}if(!o(a)&&!q(a))throw new TypeError("unexpected buffer type");var c,d,f=a.byteOffset||0,g=a.byteLength||a.length,h=new Uint8Array(a.buffer||a,f,g);for(void 0!==Fd&&zd.call(Fd,h),c=0;g>c;c++)0===(3&c)&&(Jd>=1099511627776&&Vb(),d=Hd(),Jd++),h[c]^=d,d>>>=8}function Yb(){(!Kd||Jd>=1099511627776)&&Vb();var a=(1048576*Hd()+(Hd()>>>12))/4503599627370496;return Jd+=2,a}function Zb(a,b){return a*b|0}function $b(a,b,c){"use asm";var d=0;var e=new a.Uint32Array(c);var f=a.Math.imul;function g(u){u=u|0;d=u=u+31&-32;return u|0}function h(u){u=u|0;var v=0;v=d;d=v+(u+31&-32)|0;return v|0}function i(u){u=u|0;d=d-(u+31&-32)|0}function j(u,v,w){u=u|0;v=v|0;w=w|0;var x=0;if((v|0)>(w|0)){for(;(x|0)<(u|0);x=x+4|0){e[w+x>>2]=e[v+x>>2]}}else{for(x=u-4|0;(x|0)>=0;x=x-4|0){e[w+x>>2]=e[v+x>>2]}}}function k(u,v,w){u=u|0;v=v|0;w=w|0;var x=0;for(;(x|0)<(u|0);x=x+4|0){e[w+x>>2]=v}}function l(u,v,w,x){u=u|0;v=v|0;w=w|0;x=x|0;var y=0,z=0,A=0,B=0,C=0;if((x|0)<=0)x=v;if((x|0)<(v|0))v=x;z=1;for(;(C|0)<(v|0);C=C+4|0){y=~e[u+C>>2];A=(y&65535)+z|0;B=(y>>>16)+(A>>>16)|0;e[w+C>>2]=B<<16|A&65535;z=B>>>16}for(;(C|0)<(x|0);C=C+4|0){e[w+C>>2]=z-1|0}return z|0}function m(u,v,w,x){u=u|0;v=v|0;w=w|0;x=x|0;var y=0,z=0,A=0;if((v|0)>(x|0)){for(A=v-4|0;(A|0)>=(x|0);A=A-4|0){if(e[u+A>>2]|0)return 1}}else{for(A=x-4|0;(A|0)>=(v|0);A=A-4|0){if(e[w+A>>2]|0)return-1}}for(;(A|0)>=0;A=A-4|0){y=e[u+A>>2]|0,z=e[w+A>>2]|0;if(y>>>0<z>>>0)return-1;if(y>>>0>z>>>0)return 1}return 0}function n(u,v){u=u|0;v=v|0;var w=0;for(w=v-4|0;(w|0)>=0;w=w-4|0){if(e[u+w>>2]|0)return w+4|0}return 0}function o(u,v,w,x,y,z){u=u|0;v=v|0;w=w|0;x=x|0;y=y|0;z=z|0;var A=0,B=0,C=0,D=0,E=0,F=0;if((v|0)<(x|0)){D=u,u=w,w=D;D=v,v=x,x=D}if((z|0)<=0)z=v+4|0;if((z|0)<(x|0))v=x=z;for(;(F|0)<(x|0);F=F+4|0){A=e[u+F>>2]|0;B=e[w+F>>2]|0;D=((A&65535)+(B&65535)|0)+C|0;E=((A>>>16)+(B>>>16)|0)+(D>>>16)|0;e[y+F>>2]=D&65535|E<<16;C=E>>>16}for(;(F|0)<(v|0);F=F+4|0){A=e[u+F>>2]|0;D=(A&65535)+C|0;E=(A>>>16)+(D>>>16)|0;e[y+F>>2]=D&65535|E<<16;C=E>>>16}for(;(F|0)<(z|0);F=F+4|0){e[y+F>>2]=C|0;C=0}return C|0}function p(u,v,w,x,y,z){u=u|0;v=v|0;w=w|0;x=x|0;y=y|0;z=z|0;var A=0,B=0,C=0,D=0,E=0,F=0;if((z|0)<=0)z=(v|0)>(x|0)?v+4|0:x+4|0;if((z|0)<(v|0))v=z;if((z|0)<(x|0))x=z;if((v|0)<(x|0)){for(;(F|0)<(v|0);F=F+4|0){A=e[u+F>>2]|0;B=e[w+F>>2]|0;D=((A&65535)-(B&65535)|0)+C|0;E=((A>>>16)-(B>>>16)|0)+(D>>16)|0;e[y+F>>2]=D&65535|E<<16;C=E>>16}for(;(F|0)<(x|0);F=F+4|0){B=e[w+F>>2]|0;D=C-(B&65535)|0;E=(D>>16)-(B>>>16)|0;e[y+F>>2]=D&65535|E<<16;C=E>>16}}else{for(;(F|0)<(x|0);F=F+4|0){A=e[u+F>>2]|0;B=e[w+F>>2]|0;D=((A&65535)-(B&65535)|0)+C|0;E=((A>>>16)-(B>>>16)|0)+(D>>16)|0;e[y+F>>2]=D&65535|E<<16;C=E>>16}for(;(F|0)<(v|0);F=F+4|0){A=e[u+F>>2]|0;D=(A&65535)+C|0;E=(A>>>16)+(D>>16)|0;e[y+F>>2]=D&65535|E<<16;C=E>>16}}for(;(F|0)<(z|0);F=F+4|0){e[y+F>>2]=C|0}return C|0}function q(u,v,w,x,y,z){u=u|0;v=v|0;w=w|0;x=x|0;y=y|0;z=z|0;var A=0,B=0,C=0,D=0,E=0,F=0,G=0,H=0,I=0,J=0,K=0,L=0,M=0,N=0,O=0,P=0,Q=0,R=0,S=0,T=0,U=0,V=0,W=0,X=0,Y=0,Z=0,$=0,_=0,ab=0,bb=0,cb=0,db=0,eb=0,fb=0,gb=0,hb=0,ib=0,jb=0,kb=0,lb=0,mb=0,nb=0,ob=0,pb=0,qb=0,rb=0,sb=0,tb=0,ub=0,vb=0,wb=0,xb=0,yb=0,zb=0,Ab=0,Bb=0,Cb=0;if((v|0)>(x|0)){ub=u,vb=v;u=w,v=x;w=ub,x=vb}xb=v+x|0;if((z|0)>(xb|0)|(z|0)<=0)z=xb;if((z|0)<(v|0))v=z;if((z|0)<(x|0))x=z;for(;(yb|0)<(v|0);yb=yb+32|0){zb=u+yb|0;I=e[(zb|0)>>2]|0,J=e[(zb|4)>>2]|0,K=e[(zb|8)>>2]|0,L=e[(zb|12)>>2]|0,M=e[(zb|16)>>2]|0,N=e[(zb|20)>>2]|0,O=e[(zb|24)>>2]|0,P=e[(zb|28)>>2]|0,A=I&65535,B=J&65535,C=K&65535,D=L&65535,E=M&65535,F=N&65535,G=O&65535,H=P&65535,I=I>>>16,J=J>>>16,K=K>>>16,L=L>>>16,M=M>>>16,N=N>>>16,O=O>>>16,P=P>>>16;mb=nb=ob=pb=qb=rb=sb=tb=0;for(Ab=0;(Ab|0)<(x|0);Ab=Ab+32|0){Bb=w+Ab|0;Cb=y+(yb+Ab|0)|0;Y=e[(Bb|0)>>2]|0,Z=e[(Bb|4)>>2]|0,$=e[(Bb|8)>>2]|0,_=e[(Bb|12)>>2]|0,ab=e[(Bb|16)>>2]|0,bb=e[(Bb|20)>>2]|0,cb=e[(Bb|24)>>2]|0,db=e[(Bb|28)>>2]|0,Q=Y&65535,R=Z&65535,S=$&65535,T=_&65535,U=ab&65535,V=bb&65535,W=cb&65535,X=db&65535,Y=Y>>>16,Z=Z>>>16,$=$>>>16,_=_>>>16,ab=ab>>>16,bb=bb>>>16,cb=cb>>>16,db=db>>>16;eb=e[(Cb|0)>>2]|0,fb=e[(Cb|4)>>2]|0,gb=e[(Cb|8)>>2]|0,hb=e[(Cb|12)>>2]|0,ib=e[(Cb|16)>>2]|0,jb=e[(Cb|20)>>2]|0,kb=e[(Cb|24)>>2]|0,lb=e[(Cb|28)>>2]|0;ub=((f(A,Q)|0)+(mb&65535)|0)+(eb&65535)|0;vb=((f(I,Q)|0)+(mb>>>16)|0)+(eb>>>16)|0;wb=((f(A,Y)|0)+(vb&65535)|0)+(ub>>>16)|0;xb=((f(I,Y)|0)+(vb>>>16)|0)+(wb>>>16)|0;eb=wb<<16|ub&65535;ub=((f(A,R)|0)+(xb&65535)|0)+(fb&65535)|0;vb=((f(I,R)|0)+(xb>>>16)|0)+(fb>>>16)|0;wb=((f(A,Z)|0)+(vb&65535)|0)+(ub>>>16)|0;xb=((f(I,Z)|0)+(vb>>>16)|0)+(wb>>>16)|0;fb=wb<<16|ub&65535;ub=((f(A,S)|0)+(xb&65535)|0)+(gb&65535)|0;vb=((f(I,S)|0)+(xb>>>16)|0)+(gb>>>16)|0;wb=((f(A,$)|0)+(vb&65535)|0)+(ub>>>16)|0;xb=((f(I,$)|0)+(vb>>>16)|0)+(wb>>>16)|0;gb=wb<<16|ub&65535;ub=((f(A,T)|0)+(xb&65535)|0)+(hb&65535)|0;vb=((f(I,T)|0)+(xb>>>16)|0)+(hb>>>16)|0;wb=((f(A,_)|0)+(vb&65535)|0)+(ub>>>16)|0;xb=((f(I,_)|0)+(vb>>>16)|0)+(wb>>>16)|0;hb=wb<<16|ub&65535;ub=((f(A,U)|0)+(xb&65535)|0)+(ib&65535)|0;vb=((f(I,U)|0)+(xb>>>16)|0)+(ib>>>16)|0;wb=((f(A,ab)|0)+(vb&65535)|0)+(ub>>>16)|0;xb=((f(I,ab)|0)+(vb>>>16)|0)+(wb>>>16)|0;ib=wb<<16|ub&65535;ub=((f(A,V)|0)+(xb&65535)|0)+(jb&65535)|0;vb=((f(I,V)|0)+(xb>>>16)|0)+(jb>>>16)|0;wb=((f(A,bb)|0)+(vb&65535)|0)+(ub>>>16)|0;xb=((f(I,bb)|0)+(vb>>>16)|0)+(wb>>>16)|0;jb=wb<<16|ub&65535;ub=((f(A,W)|0)+(xb&65535)|0)+(kb&65535)|0;vb=((f(I,W)|0)+(xb>>>16)|0)+(kb>>>16)|0;wb=((f(A,cb)|0)+(vb&65535)|0)+(ub>>>16)|0;xb=((f(I,cb)|0)+(vb>>>16)|0)+(wb>>>16)|0;kb=wb<<16|ub&65535;ub=((f(A,X)|0)+(xb&65535)|0)+(lb&65535)|0;vb=((f(I,X)|0)+(xb>>>16)|0)+(lb>>>16)|0;wb=((f(A,db)|0)+(vb&65535)|0)+(ub>>>16)|0;xb=((f(I,db)|0)+(vb>>>16)|0)+(wb>>>16)|0;lb=wb<<16|ub&65535;mb=xb;ub=((f(B,Q)|0)+(nb&65535)|0)+(fb&65535)|0;vb=((f(J,Q)|0)+(nb>>>16)|0)+(fb>>>16)|0;wb=((f(B,Y)|0)+(vb&65535)|0)+(ub>>>16)|0;xb=((f(J,Y)|0)+(vb>>>16)|0)+(wb>>>16)|0;fb=wb<<16|ub&65535;ub=((f(B,R)|0)+(xb&65535)|0)+(gb&65535)|0;vb=((f(J,R)|0)+(xb>>>16)|0)+(gb>>>16)|0;wb=((f(B,Z)|0)+(vb&65535)|0)+(ub>>>16)|0;xb=((f(J,Z)|0)+(vb>>>16)|0)+(wb>>>16)|0;gb=wb<<16|ub&65535;ub=((f(B,S)|0)+(xb&65535)|0)+(hb&65535)|0;vb=((f(J,S)|0)+(xb>>>16)|0)+(hb>>>16)|0;wb=((f(B,$)|0)+(vb&65535)|0)+(ub>>>16)|0;xb=((f(J,$)|0)+(vb>>>16)|0)+(wb>>>16)|0;hb=wb<<16|ub&65535;ub=((f(B,T)|0)+(xb&65535)|0)+(ib&65535)|0;vb=((f(J,T)|0)+(xb>>>16)|0)+(ib>>>16)|0;wb=((f(B,_)|0)+(vb&65535)|0)+(ub>>>16)|0;xb=((f(J,_)|0)+(vb>>>16)|0)+(wb>>>16)|0;ib=wb<<16|ub&65535;ub=((f(B,U)|0)+(xb&65535)|0)+(jb&65535)|0;vb=((f(J,U)|0)+(xb>>>16)|0)+(jb>>>16)|0;wb=((f(B,ab)|0)+(vb&65535)|0)+(ub>>>16)|0;xb=((f(J,ab)|0)+(vb>>>16)|0)+(wb>>>16)|0;jb=wb<<16|ub&65535;ub=((f(B,V)|0)+(xb&65535)|0)+(kb&65535)|0;vb=((f(J,V)|0)+(xb>>>16)|0)+(kb>>>16)|0;wb=((f(B,bb)|0)+(vb&65535)|0)+(ub>>>16)|0;xb=((f(J,bb)|0)+(vb>>>16)|0)+(wb>>>16)|0;kb=wb<<16|ub&65535;ub=((f(B,W)|0)+(xb&65535)|0)+(lb&65535)|0;vb=((f(J,W)|0)+(xb>>>16)|0)+(lb>>>16)|0;wb=((f(B,cb)|0)+(vb&65535)|0)+(ub>>>16)|0;xb=((f(J,cb)|0)+(vb>>>16)|0)+(wb>>>16)|0;lb=wb<<16|ub&65535;ub=((f(B,X)|0)+(xb&65535)|0)+(mb&65535)|0;vb=((f(J,X)|0)+(xb>>>16)|0)+(mb>>>16)|0;wb=((f(B,db)|0)+(vb&65535)|0)+(ub>>>16)|0;xb=((f(J,db)|0)+(vb>>>16)|0)+(wb>>>16)|0;mb=wb<<16|ub&65535;nb=xb;ub=((f(C,Q)|0)+(ob&65535)|0)+(gb&65535)|0;vb=((f(K,Q)|0)+(ob>>>16)|0)+(gb>>>16)|0;wb=((f(C,Y)|0)+(vb&65535)|0)+(ub>>>16)|0;xb=((f(K,Y)|0)+(vb>>>16)|0)+(wb>>>16)|0;gb=wb<<16|ub&65535;ub=((f(C,R)|0)+(xb&65535)|0)+(hb&65535)|0;vb=((f(K,R)|0)+(xb>>>16)|0)+(hb>>>16)|0;wb=((f(C,Z)|0)+(vb&65535)|0)+(ub>>>16)|0;xb=((f(K,Z)|0)+(vb>>>16)|0)+(wb>>>16)|0;hb=wb<<16|ub&65535;ub=((f(C,S)|0)+(xb&65535)|0)+(ib&65535)|0;vb=((f(K,S)|0)+(xb>>>16)|0)+(ib>>>16)|0;wb=((f(C,$)|0)+(vb&65535)|0)+(ub>>>16)|0;xb=((f(K,$)|0)+(vb>>>16)|0)+(wb>>>16)|0;ib=wb<<16|ub&65535;ub=((f(C,T)|0)+(xb&65535)|0)+(jb&65535)|0;vb=((f(K,T)|0)+(xb>>>16)|0)+(jb>>>16)|0;wb=((f(C,_)|0)+(vb&65535)|0)+(ub>>>16)|0;xb=((f(K,_)|0)+(vb>>>16)|0)+(wb>>>16)|0;jb=wb<<16|ub&65535;ub=((f(C,U)|0)+(xb&65535)|0)+(kb&65535)|0;vb=((f(K,U)|0)+(xb>>>16)|0)+(kb>>>16)|0;wb=((f(C,ab)|0)+(vb&65535)|0)+(ub>>>16)|0;xb=((f(K,ab)|0)+(vb>>>16)|0)+(wb>>>16)|0;kb=wb<<16|ub&65535;ub=((f(C,V)|0)+(xb&65535)|0)+(lb&65535)|0;vb=((f(K,V)|0)+(xb>>>16)|0)+(lb>>>16)|0;wb=((f(C,bb)|0)+(vb&65535)|0)+(ub>>>16)|0;xb=((f(K,bb)|0)+(vb>>>16)|0)+(wb>>>16)|0;lb=wb<<16|ub&65535;ub=((f(C,W)|0)+(xb&65535)|0)+(mb&65535)|0;vb=((f(K,W)|0)+(xb>>>16)|0)+(mb>>>16)|0;wb=((f(C,cb)|0)+(vb&65535)|0)+(ub>>>16)|0;xb=((f(K,cb)|0)+(vb>>>16)|0)+(wb>>>16)|0;mb=wb<<16|ub&65535;ub=((f(C,X)|0)+(xb&65535)|0)+(nb&65535)|0;vb=((f(K,X)|0)+(xb>>>16)|0)+(nb>>>16)|0;wb=((f(C,db)|0)+(vb&65535)|0)+(ub>>>16)|0;xb=((f(K,db)|0)+(vb>>>16)|0)+(wb>>>16)|0;nb=wb<<16|ub&65535;ob=xb;ub=((f(D,Q)|0)+(pb&65535)|0)+(hb&65535)|0;vb=((f(L,Q)|0)+(pb>>>16)|0)+(hb>>>16)|0;wb=((f(D,Y)|0)+(vb&65535)|0)+(ub>>>16)|0;xb=((f(L,Y)|0)+(vb>>>16)|0)+(wb>>>16)|0;hb=wb<<16|ub&65535;ub=((f(D,R)|0)+(xb&65535)|0)+(ib&65535)|0;vb=((f(L,R)|0)+(xb>>>16)|0)+(ib>>>16)|0;wb=((f(D,Z)|0)+(vb&65535)|0)+(ub>>>16)|0;xb=((f(L,Z)|0)+(vb>>>16)|0)+(wb>>>16)|0;ib=wb<<16|ub&65535;ub=((f(D,S)|0)+(xb&65535)|0)+(jb&65535)|0;vb=((f(L,S)|0)+(xb>>>16)|0)+(jb>>>16)|0;wb=((f(D,$)|0)+(vb&65535)|0)+(ub>>>16)|0;xb=((f(L,$)|0)+(vb>>>16)|0)+(wb>>>16)|0;jb=wb<<16|ub&65535;ub=((f(D,T)|0)+(xb&65535)|0)+(kb&65535)|0;vb=((f(L,T)|0)+(xb>>>16)|0)+(kb>>>16)|0;wb=((f(D,_)|0)+(vb&65535)|0)+(ub>>>16)|0;xb=((f(L,_)|0)+(vb>>>16)|0)+(wb>>>16)|0;kb=wb<<16|ub&65535;ub=((f(D,U)|0)+(xb&65535)|0)+(lb&65535)|0;vb=((f(L,U)|0)+(xb>>>16)|0)+(lb>>>16)|0;wb=((f(D,ab)|0)+(vb&65535)|0)+(ub>>>16)|0;xb=((f(L,ab)|0)+(vb>>>16)|0)+(wb>>>16)|0;lb=wb<<16|ub&65535;ub=((f(D,V)|0)+(xb&65535)|0)+(mb&65535)|0;vb=((f(L,V)|0)+(xb>>>16)|0)+(mb>>>16)|0;wb=((f(D,bb)|0)+(vb&65535)|0)+(ub>>>16)|0;xb=((f(L,bb)|0)+(vb>>>16)|0)+(wb>>>16)|0;mb=wb<<16|ub&65535;ub=((f(D,W)|0)+(xb&65535)|0)+(nb&65535)|0;vb=((f(L,W)|0)+(xb>>>16)|0)+(nb>>>16)|0;wb=((f(D,cb)|0)+(vb&65535)|0)+(ub>>>16)|0;xb=((f(L,cb)|0)+(vb>>>16)|0)+(wb>>>16)|0;nb=wb<<16|ub&65535;ub=((f(D,X)|0)+(xb&65535)|0)+(ob&65535)|0;vb=((f(L,X)|0)+(xb>>>16)|0)+(ob>>>16)|0;wb=((f(D,db)|0)+(vb&65535)|0)+(ub>>>16)|0;xb=((f(L,db)|0)+(vb>>>16)|0)+(wb>>>16)|0;ob=wb<<16|ub&65535;pb=xb;ub=((f(E,Q)|0)+(qb&65535)|0)+(ib&65535)|0;vb=((f(M,Q)|0)+(qb>>>16)|0)+(ib>>>16)|0;wb=((f(E,Y)|0)+(vb&65535)|0)+(ub>>>16)|0;xb=((f(M,Y)|0)+(vb>>>16)|0)+(wb>>>16)|0;ib=wb<<16|ub&65535;ub=((f(E,R)|0)+(xb&65535)|0)+(jb&65535)|0;vb=((f(M,R)|0)+(xb>>>16)|0)+(jb>>>16)|0;wb=((f(E,Z)|0)+(vb&65535)|0)+(ub>>>16)|0;xb=((f(M,Z)|0)+(vb>>>16)|0)+(wb>>>16)|0;jb=wb<<16|ub&65535;ub=((f(E,S)|0)+(xb&65535)|0)+(kb&65535)|0;vb=((f(M,S)|0)+(xb>>>16)|0)+(kb>>>16)|0;wb=((f(E,$)|0)+(vb&65535)|0)+(ub>>>16)|0;xb=((f(M,$)|0)+(vb>>>16)|0)+(wb>>>16)|0;kb=wb<<16|ub&65535;ub=((f(E,T)|0)+(xb&65535)|0)+(lb&65535)|0;vb=((f(M,T)|0)+(xb>>>16)|0)+(lb>>>16)|0;wb=((f(E,_)|0)+(vb&65535)|0)+(ub>>>16)|0;xb=((f(M,_)|0)+(vb>>>16)|0)+(wb>>>16)|0;lb=wb<<16|ub&65535;ub=((f(E,U)|0)+(xb&65535)|0)+(mb&65535)|0;vb=((f(M,U)|0)+(xb>>>16)|0)+(mb>>>16)|0;wb=((f(E,ab)|0)+(vb&65535)|0)+(ub>>>16)|0;xb=((f(M,ab)|0)+(vb>>>16)|0)+(wb>>>16)|0;mb=wb<<16|ub&65535;ub=((f(E,V)|0)+(xb&65535)|0)+(nb&65535)|0;vb=((f(M,V)|0)+(xb>>>16)|0)+(nb>>>16)|0;wb=((f(E,bb)|0)+(vb&65535)|0)+(ub>>>16)|0;xb=((f(M,bb)|0)+(vb>>>16)|0)+(wb>>>16)|0;nb=wb<<16|ub&65535;ub=((f(E,W)|0)+(xb&65535)|0)+(ob&65535)|0;vb=((f(M,W)|0)+(xb>>>16)|0)+(ob>>>16)|0;wb=((f(E,cb)|0)+(vb&65535)|0)+(ub>>>16)|0;xb=((f(M,cb)|0)+(vb>>>16)|0)+(wb>>>16)|0;ob=wb<<16|ub&65535;ub=((f(E,X)|0)+(xb&65535)|0)+(pb&65535)|0;vb=((f(M,X)|0)+(xb>>>16)|0)+(pb>>>16)|0;wb=((f(E,db)|0)+(vb&65535)|0)+(ub>>>16)|0;xb=((f(M,db)|0)+(vb>>>16)|0)+(wb>>>16)|0;pb=wb<<16|ub&65535;qb=xb;ub=((f(F,Q)|0)+(rb&65535)|0)+(jb&65535)|0;vb=((f(N,Q)|0)+(rb>>>16)|0)+(jb>>>16)|0;wb=((f(F,Y)|0)+(vb&65535)|0)+(ub>>>16)|0;xb=((f(N,Y)|0)+(vb>>>16)|0)+(wb>>>16)|0;jb=wb<<16|ub&65535;ub=((f(F,R)|0)+(xb&65535)|0)+(kb&65535)|0;vb=((f(N,R)|0)+(xb>>>16)|0)+(kb>>>16)|0;wb=((f(F,Z)|0)+(vb&65535)|0)+(ub>>>16)|0;xb=((f(N,Z)|0)+(vb>>>16)|0)+(wb>>>16)|0;kb=wb<<16|ub&65535;ub=((f(F,S)|0)+(xb&65535)|0)+(lb&65535)|0;vb=((f(N,S)|0)+(xb>>>16)|0)+(lb>>>16)|0;wb=((f(F,$)|0)+(vb&65535)|0)+(ub>>>16)|0;xb=((f(N,$)|0)+(vb>>>16)|0)+(wb>>>16)|0;lb=wb<<16|ub&65535;ub=((f(F,T)|0)+(xb&65535)|0)+(mb&65535)|0;vb=((f(N,T)|0)+(xb>>>16)|0)+(mb>>>16)|0;wb=((f(F,_)|0)+(vb&65535)|0)+(ub>>>16)|0;xb=((f(N,_)|0)+(vb>>>16)|0)+(wb>>>16)|0;mb=wb<<16|ub&65535;ub=((f(F,U)|0)+(xb&65535)|0)+(nb&65535)|0;vb=((f(N,U)|0)+(xb>>>16)|0)+(nb>>>16)|0;wb=((f(F,ab)|0)+(vb&65535)|0)+(ub>>>16)|0;xb=((f(N,ab)|0)+(vb>>>16)|0)+(wb>>>16)|0;nb=wb<<16|ub&65535;ub=((f(F,V)|0)+(xb&65535)|0)+(ob&65535)|0;vb=((f(N,V)|0)+(xb>>>16)|0)+(ob>>>16)|0;wb=((f(F,bb)|0)+(vb&65535)|0)+(ub>>>16)|0;xb=((f(N,bb)|0)+(vb>>>16)|0)+(wb>>>16)|0;ob=wb<<16|ub&65535;ub=((f(F,W)|0)+(xb&65535)|0)+(pb&65535)|0;vb=((f(N,W)|0)+(xb>>>16)|0)+(pb>>>16)|0;wb=((f(F,cb)|0)+(vb&65535)|0)+(ub>>>16)|0;xb=((f(N,cb)|0)+(vb>>>16)|0)+(wb>>>16)|0;pb=wb<<16|ub&65535;ub=((f(F,X)|0)+(xb&65535)|0)+(qb&65535)|0;vb=((f(N,X)|0)+(xb>>>16)|0)+(qb>>>16)|0;wb=((f(F,db)|0)+(vb&65535)|0)+(ub>>>16)|0;xb=((f(N,db)|0)+(vb>>>16)|0)+(wb>>>16)|0;qb=wb<<16|ub&65535;rb=xb;ub=((f(G,Q)|0)+(sb&65535)|0)+(kb&65535)|0;vb=((f(O,Q)|0)+(sb>>>16)|0)+(kb>>>16)|0;wb=((f(G,Y)|0)+(vb&65535)|0)+(ub>>>16)|0;xb=((f(O,Y)|0)+(vb>>>16)|0)+(wb>>>16)|0;kb=wb<<16|ub&65535;ub=((f(G,R)|0)+(xb&65535)|0)+(lb&65535)|0;vb=((f(O,R)|0)+(xb>>>16)|0)+(lb>>>16)|0;wb=((f(G,Z)|0)+(vb&65535)|0)+(ub>>>16)|0;xb=((f(O,Z)|0)+(vb>>>16)|0)+(wb>>>16)|0;lb=wb<<16|ub&65535;ub=((f(G,S)|0)+(xb&65535)|0)+(mb&65535)|0;vb=((f(O,S)|0)+(xb>>>16)|0)+(mb>>>16)|0;wb=((f(G,$)|0)+(vb&65535)|0)+(ub>>>16)|0;xb=((f(O,$)|0)+(vb>>>16)|0)+(wb>>>16)|0;mb=wb<<16|ub&65535;ub=((f(G,T)|0)+(xb&65535)|0)+(nb&65535)|0;vb=((f(O,T)|0)+(xb>>>16)|0)+(nb>>>16)|0;wb=((f(G,_)|0)+(vb&65535)|0)+(ub>>>16)|0;xb=((f(O,_)|0)+(vb>>>16)|0)+(wb>>>16)|0;nb=wb<<16|ub&65535;ub=((f(G,U)|0)+(xb&65535)|0)+(ob&65535)|0;vb=((f(O,U)|0)+(xb>>>16)|0)+(ob>>>16)|0;wb=((f(G,ab)|0)+(vb&65535)|0)+(ub>>>16)|0;xb=((f(O,ab)|0)+(vb>>>16)|0)+(wb>>>16)|0;ob=wb<<16|ub&65535;ub=((f(G,V)|0)+(xb&65535)|0)+(pb&65535)|0;vb=((f(O,V)|0)+(xb>>>16)|0)+(pb>>>16)|0;wb=((f(G,bb)|0)+(vb&65535)|0)+(ub>>>16)|0;xb=((f(O,bb)|0)+(vb>>>16)|0)+(wb>>>16)|0;pb=wb<<16|ub&65535;ub=((f(G,W)|0)+(xb&65535)|0)+(qb&65535)|0;vb=((f(O,W)|0)+(xb>>>16)|0)+(qb>>>16)|0;wb=((f(G,cb)|0)+(vb&65535)|0)+(ub>>>16)|0;xb=((f(O,cb)|0)+(vb>>>16)|0)+(wb>>>16)|0;qb=wb<<16|ub&65535;ub=((f(G,X)|0)+(xb&65535)|0)+(rb&65535)|0;vb=((f(O,X)|0)+(xb>>>16)|0)+(rb>>>16)|0;wb=((f(G,db)|0)+(vb&65535)|0)+(ub>>>16)|0;xb=((f(O,db)|0)+(vb>>>16)|0)+(wb>>>16)|0;rb=wb<<16|ub&65535;sb=xb;ub=((f(H,Q)|0)+(tb&65535)|0)+(lb&65535)|0;vb=((f(P,Q)|0)+(tb>>>16)|0)+(lb>>>16)|0;wb=((f(H,Y)|0)+(vb&65535)|0)+(ub>>>16)|0;xb=((f(P,Y)|0)+(vb>>>16)|0)+(wb>>>16)|0;lb=wb<<16|ub&65535;ub=((f(H,R)|0)+(xb&65535)|0)+(mb&65535)|0;vb=((f(P,R)|0)+(xb>>>16)|0)+(mb>>>16)|0;wb=((f(H,Z)|0)+(vb&65535)|0)+(ub>>>16)|0;xb=((f(P,Z)|0)+(vb>>>16)|0)+(wb>>>16)|0;mb=wb<<16|ub&65535;ub=((f(H,S)|0)+(xb&65535)|0)+(nb&65535)|0;vb=((f(P,S)|0)+(xb>>>16)|0)+(nb>>>16)|0;wb=((f(H,$)|0)+(vb&65535)|0)+(ub>>>16)|0;xb=((f(P,$)|0)+(vb>>>16)|0)+(wb>>>16)|0;nb=wb<<16|ub&65535;ub=((f(H,T)|0)+(xb&65535)|0)+(ob&65535)|0;vb=((f(P,T)|0)+(xb>>>16)|0)+(ob>>>16)|0;wb=((f(H,_)|0)+(vb&65535)|0)+(ub>>>16)|0;xb=((f(P,_)|0)+(vb>>>16)|0)+(wb>>>16)|0;ob=wb<<16|ub&65535;ub=((f(H,U)|0)+(xb&65535)|0)+(pb&65535)|0;vb=((f(P,U)|0)+(xb>>>16)|0)+(pb>>>16)|0;wb=((f(H,ab)|0)+(vb&65535)|0)+(ub>>>16)|0;xb=((f(P,ab)|0)+(vb>>>16)|0)+(wb>>>16)|0;pb=wb<<16|ub&65535;ub=((f(H,V)|0)+(xb&65535)|0)+(qb&65535)|0;vb=((f(P,V)|0)+(xb>>>16)|0)+(qb>>>16)|0;wb=((f(H,bb)|0)+(vb&65535)|0)+(ub>>>16)|0;xb=((f(P,bb)|0)+(vb>>>16)|0)+(wb>>>16)|0;qb=wb<<16|ub&65535;ub=((f(H,W)|0)+(xb&65535)|0)+(rb&65535)|0;vb=((f(P,W)|0)+(xb>>>16)|0)+(rb>>>16)|0;wb=((f(H,cb)|0)+(vb&65535)|0)+(ub>>>16)|0;xb=((f(P,cb)|0)+(vb>>>16)|0)+(wb>>>16)|0;rb=wb<<16|ub&65535;ub=((f(H,X)|0)+(xb&65535)|0)+(sb&65535)|0;vb=((f(P,X)|0)+(xb>>>16)|0)+(sb>>>16)|0;wb=((f(H,db)|0)+(vb&65535)|0)+(ub>>>16)|0;xb=((f(P,db)|0)+(vb>>>16)|0)+(wb>>>16)|0;sb=wb<<16|ub&65535;tb=xb;e[(Cb|0)>>2]=eb,e[(Cb|4)>>2]=fb,e[(Cb|8)>>2]=gb,e[(Cb|12)>>2]=hb,e[(Cb|16)>>2]=ib,e[(Cb|20)>>2]=jb,e[(Cb|24)>>2]=kb,e[(Cb|28)>>2]=lb}Cb=y+(yb+Ab|0)|0;e[(Cb|0)>>2]=mb,e[(Cb|4)>>2]=nb,e[(Cb|8)>>2]=ob,e[(Cb|12)>>2]=pb,e[(Cb|16)>>2]=qb,e[(Cb|20)>>2]=rb,e[(Cb|24)>>2]=sb,e[(Cb|28)>>2]=tb}}function r(u,v,w){u=u|0;v=v|0;w=w|0;var x=0,y=0,z=0,A=0,B=0,C=0,D=0,E=0,F=0,G=0,H=0,I=0,J=0,K=0,L=0,M=0,N=0,O=0,P=0,Q=0,R=0,S=0,T=0,U=0,V=0,W=0,X=0,Y=0,Z=0,$=0,_=0,ab=0,bb=0,cb=0,db=0,eb=0,fb=0,gb=0,hb=0,ib=0,jb=0,kb=0,lb=0,mb=0,nb=0,ob=0,pb=0,qb=0,rb=0,sb=0,tb=0,ub=0,vb=0,wb=0,xb=0,yb=0,zb=0,Ab=0,Bb=0,Cb=0,Db=0,Eb=0,Fb=0,Gb=0;for(;(Bb|0)<(v|0);Bb=Bb+4|0){Gb=w+(Bb<<1)|0;F=e[u+Bb>>2]|0,x=F&65535,F=F>>>16;rb=f(x,x)|0;sb=(f(x,F)|0)+(rb>>>17)|0;tb=(f(F,F)|0)+(sb>>>15)|0;e[Gb>>2]=sb<<17|rb&131071;e[(Gb|4)>>2]=tb}for(Ab=0;(Ab|0)<(v|0);Ab=Ab+8|0){Eb=u+Ab|0,Gb=w+(Ab<<1)|0;F=e[Eb>>2]|0,x=F&65535,F=F>>>16;V=e[(Eb|4)>>2]|0,N=V&65535,V=V>>>16;rb=f(x,N)|0;sb=(f(x,V)|0)+(rb>>>16)|0;tb=(f(F,N)|0)+(sb&65535)|0;wb=((f(F,V)|0)+(sb>>>16)|0)+(tb>>>16)|0;xb=e[(Gb|4)>>2]|0;rb=(xb&65535)+((rb&65535)<<1)|0;tb=((xb>>>16)+((tb&65535)<<1)|0)+(rb>>>16)|0;e[(Gb|4)>>2]=tb<<16|rb&65535;ub=tb>>>16;xb=e[(Gb|8)>>2]|0;rb=((xb&65535)+((wb&65535)<<1)|0)+ub|0;tb=((xb>>>16)+(wb>>>16<<1)|0)+(rb>>>16)|0;e[(Gb|8)>>2]=tb<<16|rb&65535;ub=tb>>>16;if(ub){xb=e[(Gb|12)>>2]|0;rb=(xb&65535)+ub|0;tb=(xb>>>16)+(rb>>>16)|0;e[(Gb|12)>>2]=tb<<16|rb&65535}}for(Ab=0;(Ab|0)<(v|0);Ab=Ab+16|0){Eb=u+Ab|0,Gb=w+(Ab<<1)|0;F=e[Eb>>2]|0,x=F&65535,F=F>>>16,G=e[(Eb|4)>>2]|0,y=G&65535,G=G>>>16;V=e[(Eb|8)>>2]|0,N=V&65535,V=V>>>16,W=e[(Eb|12)>>2]|0,O=W&65535,W=W>>>16;rb=f(x,N)|0;sb=f(F,N)|0;tb=((f(x,V)|0)+(sb&65535)|0)+(rb>>>16)|0;wb=((f(F,V)|0)+(sb>>>16)|0)+(tb>>>16)|0;bb=tb<<16|rb&65535;rb=(f(x,O)|0)+(wb&65535)|0;sb=(f(F,O)|0)+(wb>>>16)|0;tb=((f(x,W)|0)+(sb&65535)|0)+(rb>>>16)|0;wb=((f(F,W)|0)+(sb>>>16)|0)+(tb>>>16)|0;cb=tb<<16|rb&65535;db=wb;rb=(f(y,N)|0)+(cb&65535)|0;sb=(f(G,N)|0)+(cb>>>16)|0;tb=((f(y,V)|0)+(sb&65535)|0)+(rb>>>16)|0;wb=((f(G,V)|0)+(sb>>>16)|0)+(tb>>>16)|0;cb=tb<<16|rb&65535;rb=((f(y,O)|0)+(db&65535)|0)+(wb&65535)|0;sb=((f(G,O)|0)+(db>>>16)|0)+(wb>>>16)|0;tb=((f(y,W)|0)+(sb&65535)|0)+(rb>>>16)|0;wb=((f(G,W)|0)+(sb>>>16)|0)+(tb>>>16)|0;db=tb<<16|rb&65535;eb=wb;xb=e[(Gb|8)>>2]|0;rb=(xb&65535)+((bb&65535)<<1)|0;tb=((xb>>>16)+(bb>>>16<<1)|0)+(rb>>>16)|0;e[(Gb|8)>>2]=tb<<16|rb&65535;ub=tb>>>16;xb=e[(Gb|12)>>2]|0;rb=((xb&65535)+((cb&65535)<<1)|0)+ub|0;tb=((xb>>>16)+(cb>>>16<<1)|0)+(rb>>>16)|0;e[(Gb|12)>>2]=tb<<16|rb&65535;ub=tb>>>16;xb=e[(Gb|16)>>2]|0;rb=((xb&65535)+((db&65535)<<1)|0)+ub|0;tb=((xb>>>16)+(db>>>16<<1)|0)+(rb>>>16)|0;e[(Gb|16)>>2]=tb<<16|rb&65535;ub=tb>>>16;xb=e[(Gb|20)>>2]|0;rb=((xb&65535)+((eb&65535)<<1)|0)+ub|0;tb=((xb>>>16)+(eb>>>16<<1)|0)+(rb>>>16)|0;e[(Gb|20)>>2]=tb<<16|rb&65535;ub=tb>>>16;for(Db=24;!!ub&(Db|0)<32;Db=Db+4|0){xb=e[(Gb|Db)>>2]|0;rb=(xb&65535)+ub|0;tb=(xb>>>16)+(rb>>>16)|0;e[(Gb|Db)>>2]=tb<<16|rb&65535;ub=tb>>>16}}for(Ab=0;(Ab|0)<(v|0);Ab=Ab+32|0){Eb=u+Ab|0,Gb=w+(Ab<<1)|0;F=e[Eb>>2]|0,x=F&65535,F=F>>>16,G=e[(Eb|4)>>2]|0,y=G&65535,G=G>>>16,H=e[(Eb|8)>>2]|0,z=H&65535,H=H>>>16,I=e[(Eb|12)>>2]|0,A=I&65535,I=I>>>16;V=e[(Eb|16)>>2]|0,N=V&65535,V=V>>>16,W=e[(Eb|20)>>2]|0,O=W&65535,W=W>>>16,X=e[(Eb|24)>>2]|0,P=X&65535,X=X>>>16,Y=e[(Eb|28)>>2]|0,Q=Y&65535,Y=Y>>>16;rb=f(x,N)|0;sb=f(F,N)|0;tb=((f(x,V)|0)+(sb&65535)|0)+(rb>>>16)|0;wb=((f(F,V)|0)+(sb>>>16)|0)+(tb>>>16)|0;bb=tb<<16|rb&65535;rb=(f(x,O)|0)+(wb&65535)|0;sb=(f(F,O)|0)+(wb>>>16)|0;tb=((f(x,W)|0)+(sb&65535)|0)+(rb>>>16)|0;wb=((f(F,W)|0)+(sb>>>16)|0)+(tb>>>16)|0;cb=tb<<16|rb&65535;rb=(f(x,P)|0)+(wb&65535)|0;sb=(f(F,P)|0)+(wb>>>16)|0;tb=((f(x,X)|0)+(sb&65535)|0)+(rb>>>16)|0;wb=((f(F,X)|0)+(sb>>>16)|0)+(tb>>>16)|0;db=tb<<16|rb&65535;rb=(f(x,Q)|0)+(wb&65535)|0;sb=(f(F,Q)|0)+(wb>>>16)|0;tb=((f(x,Y)|0)+(sb&65535)|0)+(rb>>>16)|0;wb=((f(F,Y)|0)+(sb>>>16)|0)+(tb>>>16)|0;eb=tb<<16|rb&65535;fb=wb;rb=(f(y,N)|0)+(cb&65535)|0;sb=(f(G,N)|0)+(cb>>>16)|0;tb=((f(y,V)|0)+(sb&65535)|0)+(rb>>>16)|0;wb=((f(G,V)|0)+(sb>>>16)|0)+(tb>>>16)|0;cb=tb<<16|rb&65535;rb=((f(y,O)|0)+(db&65535)|0)+(wb&65535)|0;sb=((f(G,O)|0)+(db>>>16)|0)+(wb>>>16)|0;tb=((f(y,W)|0)+(sb&65535)|0)+(rb>>>16)|0;wb=((f(G,W)|0)+(sb>>>16)|0)+(tb>>>16)|0;db=tb<<16|rb&65535;rb=((f(y,P)|0)+(eb&65535)|0)+(wb&65535)|0;sb=((f(G,P)|0)+(eb>>>16)|0)+(wb>>>16)|0;tb=((f(y,X)|0)+(sb&65535)|0)+(rb>>>16)|0;wb=((f(G,X)|0)+(sb>>>16)|0)+(tb>>>16)|0;eb=tb<<16|rb&65535;rb=((f(y,Q)|0)+(fb&65535)|0)+(wb&65535)|0;sb=((f(G,Q)|0)+(fb>>>16)|0)+(wb>>>16)|0;tb=((f(y,Y)|0)+(sb&65535)|0)+(rb>>>16)|0;wb=((f(G,Y)|0)+(sb>>>16)|0)+(tb>>>16)|0;fb=tb<<16|rb&65535;gb=wb;rb=(f(z,N)|0)+(db&65535)|0;sb=(f(H,N)|0)+(db>>>16)|0;tb=((f(z,V)|0)+(sb&65535)|0)+(rb>>>16)|0;wb=((f(H,V)|0)+(sb>>>16)|0)+(tb>>>16)|0;db=tb<<16|rb&65535;rb=((f(z,O)|0)+(eb&65535)|0)+(wb&65535)|0;sb=((f(H,O)|0)+(eb>>>16)|0)+(wb>>>16)|0;tb=((f(z,W)|0)+(sb&65535)|0)+(rb>>>16)|0;wb=((f(H,W)|0)+(sb>>>16)|0)+(tb>>>16)|0;eb=tb<<16|rb&65535;rb=((f(z,P)|0)+(fb&65535)|0)+(wb&65535)|0;sb=((f(H,P)|0)+(fb>>>16)|0)+(wb>>>16)|0;tb=((f(z,X)|0)+(sb&65535)|0)+(rb>>>16)|0;wb=((f(H,X)|0)+(sb>>>16)|0)+(tb>>>16)|0;fb=tb<<16|rb&65535;rb=((f(z,Q)|0)+(gb&65535)|0)+(wb&65535)|0;sb=((f(H,Q)|0)+(gb>>>16)|0)+(wb>>>16)|0;tb=((f(z,Y)|0)+(sb&65535)|0)+(rb>>>16)|0;wb=((f(H,Y)|0)+(sb>>>16)|0)+(tb>>>16)|0;gb=tb<<16|rb&65535;hb=wb;rb=(f(A,N)|0)+(eb&65535)|0;sb=(f(I,N)|0)+(eb>>>16)|0;tb=((f(A,V)|0)+(sb&65535)|0)+(rb>>>16)|0;wb=((f(I,V)|0)+(sb>>>16)|0)+(tb>>>16)|0;eb=tb<<16|rb&65535;rb=((f(A,O)|0)+(fb&65535)|0)+(wb&65535)|0;sb=((f(I,O)|0)+(fb>>>16)|0)+(wb>>>16)|0;tb=((f(A,W)|0)+(sb&65535)|0)+(rb>>>16)|0;wb=((f(I,W)|0)+(sb>>>16)|0)+(tb>>>16)|0;fb=tb<<16|rb&65535;rb=((f(A,P)|0)+(gb&65535)|0)+(wb&65535)|0;sb=((f(I,P)|0)+(gb>>>16)|0)+(wb>>>16)|0;tb=((f(A,X)|0)+(sb&65535)|0)+(rb>>>16)|0;wb=((f(I,X)|0)+(sb>>>16)|0)+(tb>>>16)|0;gb=tb<<16|rb&65535;rb=((f(A,Q)|0)+(hb&65535)|0)+(wb&65535)|0;sb=((f(I,Q)|0)+(hb>>>16)|0)+(wb>>>16)|0;tb=((f(A,Y)|0)+(sb&65535)|0)+(rb>>>16)|0;wb=((f(I,Y)|0)+(sb>>>16)|0)+(tb>>>16)|0;hb=tb<<16|rb&65535;ib=wb;xb=e[(Gb|16)>>2]|0;rb=(xb&65535)+((bb&65535)<<1)|0;tb=((xb>>>16)+(bb>>>16<<1)|0)+(rb>>>16)|0;e[(Gb|16)>>2]=tb<<16|rb&65535;ub=tb>>>16;xb=e[(Gb|20)>>2]|0;rb=((xb&65535)+((cb&65535)<<1)|0)+ub|0;tb=((xb>>>16)+(cb>>>16<<1)|0)+(rb>>>16)|0;e[(Gb|20)>>2]=tb<<16|rb&65535;ub=tb>>>16;xb=e[(Gb|24)>>2]|0;rb=((xb&65535)+((db&65535)<<1)|0)+ub|0;tb=((xb>>>16)+(db>>>16<<1)|0)+(rb>>>16)|0;e[(Gb|24)>>2]=tb<<16|rb&65535;ub=tb>>>16;xb=e[(Gb|28)>>2]|0;rb=((xb&65535)+((eb&65535)<<1)|0)+ub|0;tb=((xb>>>16)+(eb>>>16<<1)|0)+(rb>>>16)|0;e[(Gb|28)>>2]=tb<<16|rb&65535;ub=tb>>>16;xb=e[Gb+32>>2]|0;rb=((xb&65535)+((fb&65535)<<1)|0)+ub|0;tb=((xb>>>16)+(fb>>>16<<1)|0)+(rb>>>16)|0;e[Gb+32>>2]=tb<<16|rb&65535;ub=tb>>>16;xb=e[Gb+36>>2]|0;rb=((xb&65535)+((gb&65535)<<1)|0)+ub|0;tb=((xb>>>16)+(gb>>>16<<1)|0)+(rb>>>16)|0;e[Gb+36>>2]=tb<<16|rb&65535;ub=tb>>>16;xb=e[Gb+40>>2]|0;rb=((xb&65535)+((hb&65535)<<1)|0)+ub|0;tb=((xb>>>16)+(hb>>>16<<1)|0)+(rb>>>16)|0;e[Gb+40>>2]=tb<<16|rb&65535;ub=tb>>>16;xb=e[Gb+44>>2]|0;rb=((xb&65535)+((ib&65535)<<1)|0)+ub|0;tb=((xb>>>16)+(ib>>>16<<1)|0)+(rb>>>16)|0;e[Gb+44>>2]=tb<<16|rb&65535;ub=tb>>>16;for(Db=48;!!ub&(Db|0)<64;Db=Db+4|0){xb=e[Gb+Db>>2]|0;rb=(xb&65535)+ub|0;tb=(xb>>>16)+(rb>>>16)|0;e[Gb+Db>>2]=tb<<16|rb&65535;ub=tb>>>16}}for(yb=32;(yb|0)<(v|0);yb=yb<<1){zb=yb<<1;for(Ab=0;(Ab|0)<(v|0);Ab=Ab+zb|0){Gb=w+(Ab<<1)|0;vb=0;for(Bb=0;(Bb|0)<(yb|0);Bb=Bb+32|0){Eb=(u+Ab|0)+Bb|0;F=e[Eb>>2]|0,x=F&65535,F=F>>>16,G=e[(Eb|4)>>2]|0,y=G&65535,G=G>>>16,H=e[(Eb|8)>>2]|0,z=H&65535,H=H>>>16,I=e[(Eb|12)>>2]|0,A=I&65535,I=I>>>16,J=e[(Eb|16)>>2]|0,B=J&65535,J=J>>>16,K=e[(Eb|20)>>2]|0,C=K&65535,K=K>>>16,L=e[(Eb|24)>>2]|0,D=L&65535,L=L>>>16,M=e[(Eb|28)>>2]|0,E=M&65535,M=M>>>16;jb=kb=lb=mb=nb=ob=pb=qb=ub=0;for(Cb=0;(Cb|0)<(yb|0);Cb=Cb+32|0){Fb=((u+Ab|0)+yb|0)+Cb|0;V=e[Fb>>2]|0,N=V&65535,V=V>>>16,W=e[(Fb|4)>>2]|0,O=W&65535,W=W>>>16,X=e[(Fb|8)>>2]|0,P=X&65535,X=X>>>16,Y=e[(Fb|12)>>2]|0,Q=Y&65535,Y=Y>>>16,Z=e[(Fb|16)>>2]|0,R=Z&65535,Z=Z>>>16,$=e[(Fb|20)>>2]|0,S=$&65535,$=$>>>16,_=e[(Fb|24)>>2]|0,T=_&65535,_=_>>>16,ab=e[(Fb|28)>>2]|0,U=ab&65535,ab=ab>>>16;bb=cb=db=eb=fb=gb=hb=ib=0;rb=((f(x,N)|0)+(bb&65535)|0)+(jb&65535)|0;sb=((f(F,N)|0)+(bb>>>16)|0)+(jb>>>16)|0;tb=((f(x,V)|0)+(sb&65535)|0)+(rb>>>16)|0;wb=((f(F,V)|0)+(sb>>>16)|0)+(tb>>>16)|0;bb=tb<<16|rb&65535;rb=((f(x,O)|0)+(cb&65535)|0)+(wb&65535)|0;sb=((f(F,O)|0)+(cb>>>16)|0)+(wb>>>16)|0;tb=((f(x,W)|0)+(sb&65535)|0)+(rb>>>16)|0;wb=((f(F,W)|0)+(sb>>>16)|0)+(tb>>>16)|0;cb=tb<<16|rb&65535;rb=((f(x,P)|0)+(db&65535)|0)+(wb&65535)|0;sb=((f(F,P)|0)+(db>>>16)|0)+(wb>>>16)|0;tb=((f(x,X)|0)+(sb&65535)|0)+(rb>>>16)|0;wb=((f(F,X)|0)+(sb>>>16)|0)+(tb>>>16)|0;db=tb<<16|rb&65535;rb=((f(x,Q)|0)+(eb&65535)|0)+(wb&65535)|0;sb=((f(F,Q)|0)+(eb>>>16)|0)+(wb>>>16)|0;tb=((f(x,Y)|0)+(sb&65535)|0)+(rb>>>16)|0;wb=((f(F,Y)|0)+(sb>>>16)|0)+(tb>>>16)|0;eb=tb<<16|rb&65535;rb=((f(x,R)|0)+(fb&65535)|0)+(wb&65535)|0;sb=((f(F,R)|0)+(fb>>>16)|0)+(wb>>>16)|0;tb=((f(x,Z)|0)+(sb&65535)|0)+(rb>>>16)|0;wb=((f(F,Z)|0)+(sb>>>16)|0)+(tb>>>16)|0;fb=tb<<16|rb&65535;rb=((f(x,S)|0)+(gb&65535)|0)+(wb&65535)|0;sb=((f(F,S)|0)+(gb>>>16)|0)+(wb>>>16)|0;tb=((f(x,$)|0)+(sb&65535)|0)+(rb>>>16)|0;wb=((f(F,$)|0)+(sb>>>16)|0)+(tb>>>16)|0;gb=tb<<16|rb&65535;rb=((f(x,T)|0)+(hb&65535)|0)+(wb&65535)|0;sb=((f(F,T)|0)+(hb>>>16)|0)+(wb>>>16)|0;tb=((f(x,_)|0)+(sb&65535)|0)+(rb>>>16)|0;wb=((f(F,_)|0)+(sb>>>16)|0)+(tb>>>16)|0;hb=tb<<16|rb&65535;rb=((f(x,U)|0)+(ib&65535)|0)+(wb&65535)|0;sb=((f(F,U)|0)+(ib>>>16)|0)+(wb>>>16)|0;tb=((f(x,ab)|0)+(sb&65535)|0)+(rb>>>16)|0;wb=((f(F,ab)|0)+(sb>>>16)|0)+(tb>>>16)|0;ib=tb<<16|rb&65535;jb=wb;rb=((f(y,N)|0)+(cb&65535)|0)+(kb&65535)|0;sb=((f(G,N)|0)+(cb>>>16)|0)+(kb>>>16)|0;tb=((f(y,V)|0)+(sb&65535)|0)+(rb>>>16)|0;wb=((f(G,V)|0)+(sb>>>16)|0)+(tb>>>16)|0;cb=tb<<16|rb&65535;rb=((f(y,O)|0)+(db&65535)|0)+(wb&65535)|0;sb=((f(G,O)|0)+(db>>>16)|0)+(wb>>>16)|0;tb=((f(y,W)|0)+(sb&65535)|0)+(rb>>>16)|0;wb=((f(G,W)|0)+(sb>>>16)|0)+(tb>>>16)|0;db=tb<<16|rb&65535;rb=((f(y,P)|0)+(eb&65535)|0)+(wb&65535)|0;sb=((f(G,P)|0)+(eb>>>16)|0)+(wb>>>16)|0;tb=((f(y,X)|0)+(sb&65535)|0)+(rb>>>16)|0;wb=((f(G,X)|0)+(sb>>>16)|0)+(tb>>>16)|0;eb=tb<<16|rb&65535;rb=((f(y,Q)|0)+(fb&65535)|0)+(wb&65535)|0;sb=((f(G,Q)|0)+(fb>>>16)|0)+(wb>>>16)|0;tb=((f(y,Y)|0)+(sb&65535)|0)+(rb>>>16)|0;wb=((f(G,Y)|0)+(sb>>>16)|0)+(tb>>>16)|0;fb=tb<<16|rb&65535;rb=((f(y,R)|0)+(gb&65535)|0)+(wb&65535)|0;sb=((f(G,R)|0)+(gb>>>16)|0)+(wb>>>16)|0;tb=((f(y,Z)|0)+(sb&65535)|0)+(rb>>>16)|0;wb=((f(G,Z)|0)+(sb>>>16)|0)+(tb>>>16)|0;gb=tb<<16|rb&65535;rb=((f(y,S)|0)+(hb&65535)|0)+(wb&65535)|0;sb=((f(G,S)|0)+(hb>>>16)|0)+(wb>>>16)|0;tb=((f(y,$)|0)+(sb&65535)|0)+(rb>>>16)|0;wb=((f(G,$)|0)+(sb>>>16)|0)+(tb>>>16)|0;hb=tb<<16|rb&65535;rb=((f(y,T)|0)+(ib&65535)|0)+(wb&65535)|0;sb=((f(G,T)|0)+(ib>>>16)|0)+(wb>>>16)|0;tb=((f(y,_)|0)+(sb&65535)|0)+(rb>>>16)|0;wb=((f(G,_)|0)+(sb>>>16)|0)+(tb>>>16)|0;ib=tb<<16|rb&65535;rb=((f(y,U)|0)+(jb&65535)|0)+(wb&65535)|0;sb=((f(G,U)|0)+(jb>>>16)|0)+(wb>>>16)|0;tb=((f(y,ab)|0)+(sb&65535)|0)+(rb>>>16)|0;wb=((f(G,ab)|0)+(sb>>>16)|0)+(tb>>>16)|0;jb=tb<<16|rb&65535;kb=wb;rb=((f(z,N)|0)+(db&65535)|0)+(lb&65535)|0;sb=((f(H,N)|0)+(db>>>16)|0)+(lb>>>16)|0;tb=((f(z,V)|0)+(sb&65535)|0)+(rb>>>16)|0;wb=((f(H,V)|0)+(sb>>>16)|0)+(tb>>>16)|0;db=tb<<16|rb&65535;rb=((f(z,O)|0)+(eb&65535)|0)+(wb&65535)|0;sb=((f(H,O)|0)+(eb>>>16)|0)+(wb>>>16)|0;tb=((f(z,W)|0)+(sb&65535)|0)+(rb>>>16)|0;wb=((f(H,W)|0)+(sb>>>16)|0)+(tb>>>16)|0;eb=tb<<16|rb&65535;rb=((f(z,P)|0)+(fb&65535)|0)+(wb&65535)|0;sb=((f(H,P)|0)+(fb>>>16)|0)+(wb>>>16)|0;tb=((f(z,X)|0)+(sb&65535)|0)+(rb>>>16)|0;wb=((f(H,X)|0)+(sb>>>16)|0)+(tb>>>16)|0;fb=tb<<16|rb&65535;rb=((f(z,Q)|0)+(gb&65535)|0)+(wb&65535)|0;sb=((f(H,Q)|0)+(gb>>>16)|0)+(wb>>>16)|0;tb=((f(z,Y)|0)+(sb&65535)|0)+(rb>>>16)|0;wb=((f(H,Y)|0)+(sb>>>16)|0)+(tb>>>16)|0;gb=tb<<16|rb&65535;rb=((f(z,R)|0)+(hb&65535)|0)+(wb&65535)|0;sb=((f(H,R)|0)+(hb>>>16)|0)+(wb>>>16)|0;tb=((f(z,Z)|0)+(sb&65535)|0)+(rb>>>16)|0;wb=((f(H,Z)|0)+(sb>>>16)|0)+(tb>>>16)|0;hb=tb<<16|rb&65535;rb=((f(z,S)|0)+(ib&65535)|0)+(wb&65535)|0;sb=((f(H,S)|0)+(ib>>>16)|0)+(wb>>>16)|0;tb=((f(z,$)|0)+(sb&65535)|0)+(rb>>>16)|0;wb=((f(H,$)|0)+(sb>>>16)|0)+(tb>>>16)|0;ib=tb<<16|rb&65535;rb=((f(z,T)|0)+(jb&65535)|0)+(wb&65535)|0;sb=((f(H,T)|0)+(jb>>>16)|0)+(wb>>>16)|0;tb=((f(z,_)|0)+(sb&65535)|0)+(rb>>>16)|0;wb=((f(H,_)|0)+(sb>>>16)|0)+(tb>>>16)|0;jb=tb<<16|rb&65535;rb=((f(z,U)|0)+(kb&65535)|0)+(wb&65535)|0;sb=((f(H,U)|0)+(kb>>>16)|0)+(wb>>>16)|0;tb=((f(z,ab)|0)+(sb&65535)|0)+(rb>>>16)|0;wb=((f(H,ab)|0)+(sb>>>16)|0)+(tb>>>16)|0;kb=tb<<16|rb&65535;lb=wb;rb=((f(A,N)|0)+(eb&65535)|0)+(mb&65535)|0;sb=((f(I,N)|0)+(eb>>>16)|0)+(mb>>>16)|0;tb=((f(A,V)|0)+(sb&65535)|0)+(rb>>>16)|0;wb=((f(I,V)|0)+(sb>>>16)|0)+(tb>>>16)|0;eb=tb<<16|rb&65535;rb=((f(A,O)|0)+(fb&65535)|0)+(wb&65535)|0;sb=((f(I,O)|0)+(fb>>>16)|0)+(wb>>>16)|0;tb=((f(A,W)|0)+(sb&65535)|0)+(rb>>>16)|0;wb=((f(I,W)|0)+(sb>>>16)|0)+(tb>>>16)|0;fb=tb<<16|rb&65535;rb=((f(A,P)|0)+(gb&65535)|0)+(wb&65535)|0;sb=((f(I,P)|0)+(gb>>>16)|0)+(wb>>>16)|0;tb=((f(A,X)|0)+(sb&65535)|0)+(rb>>>16)|0;wb=((f(I,X)|0)+(sb>>>16)|0)+(tb>>>16)|0;gb=tb<<16|rb&65535;rb=((f(A,Q)|0)+(hb&65535)|0)+(wb&65535)|0;sb=((f(I,Q)|0)+(hb>>>16)|0)+(wb>>>16)|0;tb=((f(A,Y)|0)+(sb&65535)|0)+(rb>>>16)|0;wb=((f(I,Y)|0)+(sb>>>16)|0)+(tb>>>16)|0;hb=tb<<16|rb&65535;rb=((f(A,R)|0)+(ib&65535)|0)+(wb&65535)|0;sb=((f(I,R)|0)+(ib>>>16)|0)+(wb>>>16)|0;tb=((f(A,Z)|0)+(sb&65535)|0)+(rb>>>16)|0;wb=((f(I,Z)|0)+(sb>>>16)|0)+(tb>>>16)|0;ib=tb<<16|rb&65535;rb=((f(A,S)|0)+(jb&65535)|0)+(wb&65535)|0;sb=((f(I,S)|0)+(jb>>>16)|0)+(wb>>>16)|0;tb=((f(A,$)|0)+(sb&65535)|0)+(rb>>>16)|0;wb=((f(I,$)|0)+(sb>>>16)|0)+(tb>>>16)|0;jb=tb<<16|rb&65535;rb=((f(A,T)|0)+(kb&65535)|0)+(wb&65535)|0;sb=((f(I,T)|0)+(kb>>>16)|0)+(wb>>>16)|0;tb=((f(A,_)|0)+(sb&65535)|0)+(rb>>>16)|0;wb=((f(I,_)|0)+(sb>>>16)|0)+(tb>>>16)|0;kb=tb<<16|rb&65535;rb=((f(A,U)|0)+(lb&65535)|0)+(wb&65535)|0;sb=((f(I,U)|0)+(lb>>>16)|0)+(wb>>>16)|0;tb=((f(A,ab)|0)+(sb&65535)|0)+(rb>>>16)|0;wb=((f(I,ab)|0)+(sb>>>16)|0)+(tb>>>16)|0;lb=tb<<16|rb&65535;mb=wb;rb=((f(B,N)|0)+(fb&65535)|0)+(nb&65535)|0;sb=((f(J,N)|0)+(fb>>>16)|0)+(nb>>>16)|0;tb=((f(B,V)|0)+(sb&65535)|0)+(rb>>>16)|0;wb=((f(J,V)|0)+(sb>>>16)|0)+(tb>>>16)|0;fb=tb<<16|rb&65535;rb=((f(B,O)|0)+(gb&65535)|0)+(wb&65535)|0;sb=((f(J,O)|0)+(gb>>>16)|0)+(wb>>>16)|0;tb=((f(B,W)|0)+(sb&65535)|0)+(rb>>>16)|0;wb=((f(J,W)|0)+(sb>>>16)|0)+(tb>>>16)|0;gb=tb<<16|rb&65535;rb=((f(B,P)|0)+(hb&65535)|0)+(wb&65535)|0;sb=((f(J,P)|0)+(hb>>>16)|0)+(wb>>>16)|0;tb=((f(B,X)|0)+(sb&65535)|0)+(rb>>>16)|0;wb=((f(J,X)|0)+(sb>>>16)|0)+(tb>>>16)|0;hb=tb<<16|rb&65535;rb=((f(B,Q)|0)+(ib&65535)|0)+(wb&65535)|0;sb=((f(J,Q)|0)+(ib>>>16)|0)+(wb>>>16)|0;tb=((f(B,Y)|0)+(sb&65535)|0)+(rb>>>16)|0;wb=((f(J,Y)|0)+(sb>>>16)|0)+(tb>>>16)|0;ib=tb<<16|rb&65535;rb=((f(B,R)|0)+(jb&65535)|0)+(wb&65535)|0;sb=((f(J,R)|0)+(jb>>>16)|0)+(wb>>>16)|0;tb=((f(B,Z)|0)+(sb&65535)|0)+(rb>>>16)|0;wb=((f(J,Z)|0)+(sb>>>16)|0)+(tb>>>16)|0;jb=tb<<16|rb&65535;rb=((f(B,S)|0)+(kb&65535)|0)+(wb&65535)|0;sb=((f(J,S)|0)+(kb>>>16)|0)+(wb>>>16)|0;tb=((f(B,$)|0)+(sb&65535)|0)+(rb>>>16)|0;wb=((f(J,$)|0)+(sb>>>16)|0)+(tb>>>16)|0;kb=tb<<16|rb&65535;rb=((f(B,T)|0)+(lb&65535)|0)+(wb&65535)|0;sb=((f(J,T)|0)+(lb>>>16)|0)+(wb>>>16)|0;tb=((f(B,_)|0)+(sb&65535)|0)+(rb>>>16)|0;wb=((f(J,_)|0)+(sb>>>16)|0)+(tb>>>16)|0;lb=tb<<16|rb&65535;rb=((f(B,U)|0)+(mb&65535)|0)+(wb&65535)|0;sb=((f(J,U)|0)+(mb>>>16)|0)+(wb>>>16)|0;tb=((f(B,ab)|0)+(sb&65535)|0)+(rb>>>16)|0;wb=((f(J,ab)|0)+(sb>>>16)|0)+(tb>>>16)|0;mb=tb<<16|rb&65535;nb=wb;rb=((f(C,N)|0)+(gb&65535)|0)+(ob&65535)|0;sb=((f(K,N)|0)+(gb>>>16)|0)+(ob>>>16)|0;tb=((f(C,V)|0)+(sb&65535)|0)+(rb>>>16)|0;wb=((f(K,V)|0)+(sb>>>16)|0)+(tb>>>16)|0;gb=tb<<16|rb&65535;rb=((f(C,O)|0)+(hb&65535)|0)+(wb&65535)|0;sb=((f(K,O)|0)+(hb>>>16)|0)+(wb>>>16)|0;tb=((f(C,W)|0)+(sb&65535)|0)+(rb>>>16)|0;wb=((f(K,W)|0)+(sb>>>16)|0)+(tb>>>16)|0;hb=tb<<16|rb&65535;rb=((f(C,P)|0)+(ib&65535)|0)+(wb&65535)|0;sb=((f(K,P)|0)+(ib>>>16)|0)+(wb>>>16)|0;tb=((f(C,X)|0)+(sb&65535)|0)+(rb>>>16)|0;wb=((f(K,X)|0)+(sb>>>16)|0)+(tb>>>16)|0;ib=tb<<16|rb&65535;rb=((f(C,Q)|0)+(jb&65535)|0)+(wb&65535)|0;sb=((f(K,Q)|0)+(jb>>>16)|0)+(wb>>>16)|0;tb=((f(C,Y)|0)+(sb&65535)|0)+(rb>>>16)|0;wb=((f(K,Y)|0)+(sb>>>16)|0)+(tb>>>16)|0;jb=tb<<16|rb&65535;rb=((f(C,R)|0)+(kb&65535)|0)+(wb&65535)|0;sb=((f(K,R)|0)+(kb>>>16)|0)+(wb>>>16)|0;tb=((f(C,Z)|0)+(sb&65535)|0)+(rb>>>16)|0;wb=((f(K,Z)|0)+(sb>>>16)|0)+(tb>>>16)|0;kb=tb<<16|rb&65535;rb=((f(C,S)|0)+(lb&65535)|0)+(wb&65535)|0;sb=((f(K,S)|0)+(lb>>>16)|0)+(wb>>>16)|0;tb=((f(C,$)|0)+(sb&65535)|0)+(rb>>>16)|0;wb=((f(K,$)|0)+(sb>>>16)|0)+(tb>>>16)|0;lb=tb<<16|rb&65535;rb=((f(C,T)|0)+(mb&65535)|0)+(wb&65535)|0;sb=((f(K,T)|0)+(mb>>>16)|0)+(wb>>>16)|0;tb=((f(C,_)|0)+(sb&65535)|0)+(rb>>>16)|0;wb=((f(K,_)|0)+(sb>>>16)|0)+(tb>>>16)|0;mb=tb<<16|rb&65535;rb=((f(C,U)|0)+(nb&65535)|0)+(wb&65535)|0;sb=((f(K,U)|0)+(nb>>>16)|0)+(wb>>>16)|0;tb=((f(C,ab)|0)+(sb&65535)|0)+(rb>>>16)|0;wb=((f(K,ab)|0)+(sb>>>16)|0)+(tb>>>16)|0;nb=tb<<16|rb&65535;ob=wb;rb=((f(D,N)|0)+(hb&65535)|0)+(pb&65535)|0;sb=((f(L,N)|0)+(hb>>>16)|0)+(pb>>>16)|0;tb=((f(D,V)|0)+(sb&65535)|0)+(rb>>>16)|0;wb=((f(L,V)|0)+(sb>>>16)|0)+(tb>>>16)|0;hb=tb<<16|rb&65535;rb=((f(D,O)|0)+(ib&65535)|0)+(wb&65535)|0;sb=((f(L,O)|0)+(ib>>>16)|0)+(wb>>>16)|0;tb=((f(D,W)|0)+(sb&65535)|0)+(rb>>>16)|0;wb=((f(L,W)|0)+(sb>>>16)|0)+(tb>>>16)|0;ib=tb<<16|rb&65535;rb=((f(D,P)|0)+(jb&65535)|0)+(wb&65535)|0;sb=((f(L,P)|0)+(jb>>>16)|0)+(wb>>>16)|0;tb=((f(D,X)|0)+(sb&65535)|0)+(rb>>>16)|0;wb=((f(L,X)|0)+(sb>>>16)|0)+(tb>>>16)|0;jb=tb<<16|rb&65535;rb=((f(D,Q)|0)+(kb&65535)|0)+(wb&65535)|0;sb=((f(L,Q)|0)+(kb>>>16)|0)+(wb>>>16)|0;tb=((f(D,Y)|0)+(sb&65535)|0)+(rb>>>16)|0;wb=((f(L,Y)|0)+(sb>>>16)|0)+(tb>>>16)|0;kb=tb<<16|rb&65535;rb=((f(D,R)|0)+(lb&65535)|0)+(wb&65535)|0;sb=((f(L,R)|0)+(lb>>>16)|0)+(wb>>>16)|0;tb=((f(D,Z)|0)+(sb&65535)|0)+(rb>>>16)|0;wb=((f(L,Z)|0)+(sb>>>16)|0)+(tb>>>16)|0;lb=tb<<16|rb&65535;rb=((f(D,S)|0)+(mb&65535)|0)+(wb&65535)|0;sb=((f(L,S)|0)+(mb>>>16)|0)+(wb>>>16)|0;tb=((f(D,$)|0)+(sb&65535)|0)+(rb>>>16)|0;wb=((f(L,$)|0)+(sb>>>16)|0)+(tb>>>16)|0;mb=tb<<16|rb&65535;rb=((f(D,T)|0)+(nb&65535)|0)+(wb&65535)|0;sb=((f(L,T)|0)+(nb>>>16)|0)+(wb>>>16)|0;tb=((f(D,_)|0)+(sb&65535)|0)+(rb>>>16)|0;wb=((f(L,_)|0)+(sb>>>16)|0)+(tb>>>16)|0;nb=tb<<16|rb&65535;rb=((f(D,U)|0)+(ob&65535)|0)+(wb&65535)|0;sb=((f(L,U)|0)+(ob>>>16)|0)+(wb>>>16)|0;tb=((f(D,ab)|0)+(sb&65535)|0)+(rb>>>16)|0;wb=((f(L,ab)|0)+(sb>>>16)|0)+(tb>>>16)|0;ob=tb<<16|rb&65535;pb=wb;rb=((f(E,N)|0)+(ib&65535)|0)+(qb&65535)|0;sb=((f(M,N)|0)+(ib>>>16)|0)+(qb>>>16)|0;tb=((f(E,V)|0)+(sb&65535)|0)+(rb>>>16)|0;wb=((f(M,V)|0)+(sb>>>16)|0)+(tb>>>16)|0;ib=tb<<16|rb&65535;rb=((f(E,O)|0)+(jb&65535)|0)+(wb&65535)|0;sb=((f(M,O)|0)+(jb>>>16)|0)+(wb>>>16)|0;tb=((f(E,W)|0)+(sb&65535)|0)+(rb>>>16)|0;wb=((f(M,W)|0)+(sb>>>16)|0)+(tb>>>16)|0;jb=tb<<16|rb&65535;rb=((f(E,P)|0)+(kb&65535)|0)+(wb&65535)|0;sb=((f(M,P)|0)+(kb>>>16)|0)+(wb>>>16)|0;tb=((f(E,X)|0)+(sb&65535)|0)+(rb>>>16)|0;wb=((f(M,X)|0)+(sb>>>16)|0)+(tb>>>16)|0;kb=tb<<16|rb&65535;rb=((f(E,Q)|0)+(lb&65535)|0)+(wb&65535)|0;sb=((f(M,Q)|0)+(lb>>>16)|0)+(wb>>>16)|0;tb=((f(E,Y)|0)+(sb&65535)|0)+(rb>>>16)|0;wb=((f(M,Y)|0)+(sb>>>16)|0)+(tb>>>16)|0;lb=tb<<16|rb&65535;rb=((f(E,R)|0)+(mb&65535)|0)+(wb&65535)|0;sb=((f(M,R)|0)+(mb>>>16)|0)+(wb>>>16)|0;tb=((f(E,Z)|0)+(sb&65535)|0)+(rb>>>16)|0;wb=((f(M,Z)|0)+(sb>>>16)|0)+(tb>>>16)|0;mb=tb<<16|rb&65535;rb=((f(E,S)|0)+(nb&65535)|0)+(wb&65535)|0;sb=((f(M,S)|0)+(nb>>>16)|0)+(wb>>>16)|0;tb=((f(E,$)|0)+(sb&65535)|0)+(rb>>>16)|0;wb=((f(M,$)|0)+(sb>>>16)|0)+(tb>>>16)|0;nb=tb<<16|rb&65535;rb=((f(E,T)|0)+(ob&65535)|0)+(wb&65535)|0;sb=((f(M,T)|0)+(ob>>>16)|0)+(wb>>>16)|0;tb=((f(E,_)|0)+(sb&65535)|0)+(rb>>>16)|0;wb=((f(M,_)|0)+(sb>>>16)|0)+(tb>>>16)|0;ob=tb<<16|rb&65535;rb=((f(E,U)|0)+(pb&65535)|0)+(wb&65535)|0;sb=((f(M,U)|0)+(pb>>>16)|0)+(wb>>>16)|0;tb=((f(E,ab)|0)+(sb&65535)|0)+(rb>>>16)|0;wb=((f(M,ab)|0)+(sb>>>16)|0)+(tb>>>16)|0;pb=tb<<16|rb&65535;qb=wb;Db=yb+(Bb+Cb|0)|0;xb=e[Gb+Db>>2]|0;rb=((xb&65535)+((bb&65535)<<1)|0)+ub|0;tb=((xb>>>16)+(bb>>>16<<1)|0)+(rb>>>16)|0;e[Gb+Db>>2]=tb<<16|rb&65535;ub=tb>>>16;Db=Db+4|0;xb=e[Gb+Db>>2]|0;rb=((xb&65535)+((cb&65535)<<1)|0)+ub|0;tb=((xb>>>16)+(cb>>>16<<1)|0)+(rb>>>16)|0;e[Gb+Db>>2]=tb<<16|rb&65535;ub=tb>>>16;Db=Db+4|0;xb=e[Gb+Db>>2]|0;rb=((xb&65535)+((db&65535)<<1)|0)+ub|0;tb=((xb>>>16)+(db>>>16<<1)|0)+(rb>>>16)|0;e[Gb+Db>>2]=tb<<16|rb&65535;ub=tb>>>16;Db=Db+4|0;xb=e[Gb+Db>>2]|0;rb=((xb&65535)+((eb&65535)<<1)|0)+ub|0;tb=((xb>>>16)+(eb>>>16<<1)|0)+(rb>>>16)|0;e[Gb+Db>>2]=tb<<16|rb&65535;ub=tb>>>16;Db=Db+4|0;xb=e[Gb+Db>>2]|0;rb=((xb&65535)+((fb&65535)<<1)|0)+ub|0;tb=((xb>>>16)+(fb>>>16<<1)|0)+(rb>>>16)|0;e[Gb+Db>>2]=tb<<16|rb&65535;ub=tb>>>16;Db=Db+4|0;xb=e[Gb+Db>>2]|0;rb=((xb&65535)+((gb&65535)<<1)|0)+ub|0;tb=((xb>>>16)+(gb>>>16<<1)|0)+(rb>>>16)|0;e[Gb+Db>>2]=tb<<16|rb&65535;ub=tb>>>16;Db=Db+4|0;xb=e[Gb+Db>>2]|0;rb=((xb&65535)+((hb&65535)<<1)|0)+ub|0;tb=((xb>>>16)+(hb>>>16<<1)|0)+(rb>>>16)|0;e[Gb+Db>>2]=tb<<16|rb&65535;ub=tb>>>16;Db=Db+4|0;xb=e[Gb+Db>>2]|0;rb=((xb&65535)+((ib&65535)<<1)|0)+ub|0;tb=((xb>>>16)+(ib>>>16<<1)|0)+(rb>>>16)|0;e[Gb+Db>>2]=tb<<16|rb&65535;ub=tb>>>16}Db=yb+(Bb+Cb|0)|0;xb=e[Gb+Db>>2]|0;rb=(((xb&65535)+((jb&65535)<<1)|0)+ub|0)+vb|0;tb=((xb>>>16)+(jb>>>16<<1)|0)+(rb>>>16)|0;e[Gb+Db>>2]=tb<<16|rb&65535;ub=tb>>>16;Db=Db+4|0;xb=e[Gb+Db>>2]|0;rb=((xb&65535)+((kb&65535)<<1)|0)+ub|0;tb=((xb>>>16)+(kb>>>16<<1)|0)+(rb>>>16)|0;e[Gb+Db>>2]=tb<<16|rb&65535;ub=tb>>>16;Db=Db+4|0;xb=e[Gb+Db>>2]|0;rb=((xb&65535)+((lb&65535)<<1)|0)+ub|0;tb=((xb>>>16)+(lb>>>16<<1)|0)+(rb>>>16)|0;e[Gb+Db>>2]=tb<<16|rb&65535;ub=tb>>>16;Db=Db+4|0;xb=e[Gb+Db>>2]|0;rb=((xb&65535)+((mb&65535)<<1)|0)+ub|0;tb=((xb>>>16)+(mb>>>16<<1)|0)+(rb>>>16)|0;e[Gb+Db>>2]=tb<<16|rb&65535;ub=tb>>>16;Db=Db+4|0;xb=e[Gb+Db>>2]|0;rb=((xb&65535)+((nb&65535)<<1)|0)+ub|0;tb=((xb>>>16)+(nb>>>16<<1)|0)+(rb>>>16)|0;e[Gb+Db>>2]=tb<<16|rb&65535;ub=tb>>>16;Db=Db+4|0;xb=e[Gb+Db>>2]|0;rb=((xb&65535)+((ob&65535)<<1)|0)+ub|0;tb=((xb>>>16)+(ob>>>16<<1)|0)+(rb>>>16)|0;e[Gb+Db>>2]=tb<<16|rb&65535;ub=tb>>>16;Db=Db+4|0;xb=e[Gb+Db>>2]|0;rb=((xb&65535)+((pb&65535)<<1)|0)+ub|0;tb=((xb>>>16)+(pb>>>16<<1)|0)+(rb>>>16)|0;e[Gb+Db>>2]=tb<<16|rb&65535;ub=tb>>>16;Db=Db+4|0;xb=e[Gb+Db>>2]|0;rb=((xb&65535)+((qb&65535)<<1)|0)+ub|0;tb=((xb>>>16)+(qb>>>16<<1)|0)+(rb>>>16)|0;e[Gb+Db>>2]=tb<<16|rb&65535;vb=tb>>>16}for(Db=Db+4|0;!!vb&(Db|0)<zb<<1;Db=Db+4|0){xb=e[Gb+Db>>2]|0;rb=(xb&65535)+vb|0;tb=(xb>>>16)+(rb>>>16)|0;e[Gb+Db>>2]=tb<<16|rb&65535;vb=tb>>>16}}}}function s(u,v,w,x,y,z){u=u|0;v=v|0;w=w|0;x=x|0;y=y|0;z=z|0;var A=0,B=0,C=0,D=0,E=0,F=0,G=0,H=0,I=0,J=0,K=0,L=0,M=0,N=0,O=0,P=0,Q=0,R=0,S=0;j(v,u,y);for(Q=v-1&-4;(Q|0)>=0;Q=Q-4|0){A=e[u+Q>>2]|0;if(A){v=Q;break}}for(Q=x-1&-4;(Q|0)>=0;Q=Q-4|0){B=e[w+Q>>2]|0;if(B){x=Q;break}}while((B&2147483648)==0){B=B<<1;C=C+1|0}E=e[u+v>>2]|0;if(C)D=E>>>(32-C|0);for(Q=v-4|0;(Q|0)>=0;Q=Q-4|0){A=e[u+Q>>2]|0;e[y+Q+4>>2]=E<<C|(C?A>>>(32-C|0):0);E=A}e[y>>2]=E<<C;if(C){F=e[w+x>>2]|0;for(Q=x-4|0;(Q|0)>=0;Q=Q-4|0){B=e[w+Q>>2]|0;e[w+Q+4>>2]=F<<C|B>>>(32-C|0);F=B}e[w>>2]=F<<C}F=e[w+x>>2]|0;G=F>>>16,H=F&65535;for(Q=v;(Q|0)>=(x|0);Q=Q-4|0){R=Q-x|0;E=e[y+Q>>2]|0;I=(D>>>0)/(G>>>0)|0,K=(D>>>0)%(G>>>0)|0,M=f(I,H)|0;while((I|0)==65536|M>>>0>(K<<16|E>>>16)>>>0){I=I-1|0,K=K+G|0,M=M-H|0;if((K|0)>=65536)break}O=0,P=0;for(S=0;(S|0)<=(x|0);S=S+4|0){B=e[w+S>>2]|0;M=(f(I,B&65535)|0)+(O>>>16)|0;N=(f(I,B>>>16)|0)+(M>>>16)|0;B=O&65535|M<<16;O=N;A=e[y+R+S>>2]|0;M=((A&65535)-(B&65535)|0)+P|0;N=((A>>>16)-(B>>>16)|0)+(M>>16)|0;e[y+R+S>>2]=N<<16|M&65535;P=N>>16}M=((D&65535)-(O&65535)|0)+P|0;N=((D>>>16)-(O>>>16)|0)+(M>>16)|0;e[y+R+S>>2]=D=N<<16|M&65535;P=N>>16;if(P){I=I-1|0,K=K-G|0;P=0;for(S=0;(S|0)<=(x|0);S=S+4|0){B=e[w+S>>2]|0;A=e[y+R+S>>2]|0;M=((A&65535)+(B&65535)|0)+P|0;N=((A>>>16)+(B>>>16)|0)+(M>>>16)|0;e[y+R+S>>2]=N<<16|M&65535;P=N>>>16}e[y+R+S>>2]=D=D+P|0}E=e[y+Q>>2]|0;A=D<<16|E>>>16;J=(A>>>0)/(G>>>0)|0,L=(A>>>0)%(G>>>0)|0,M=f(J,H)|0;while((J|0)==65536|M>>>0>(L<<16|E&65535)>>>0){J=J-1|0,L=L+G|0,M=M-H|0;if((L|0)>=65536)break}O=0,P=0;for(S=0;(S|0)<=(x|0);S=S+4|0){B=e[w+S>>2]|0;M=(f(J,B&65535)|0)+(O&65535)|0;N=((f(J,B>>>16)|0)+(M>>>16)|0)+(O>>>16)|0;B=M&65535|N<<16;O=N>>>16;A=e[y+R+S>>2]|0;M=((A&65535)-(B&65535)|0)+P|0;N=((A>>>16)-(B>>>16)|0)+(M>>16)|0;P=N>>16;e[y+R+S>>2]=N<<16|M&65535}M=((D&65535)-(O&65535)|0)+P|0;N=((D>>>16)-(O>>>16)|0)+(M>>16)|0;e[y+R+S>>2]=D=N<<16|M&65535;P=N>>16;if(P){J=J-1|0,L=L+G|0;P=0;for(S=0;(S|0)<=(x|0);S=S+4|0){B=e[w+S>>2]|0;A=e[y+R+S>>2]|0;M=((A&65535)+(B&65535)|0)+P|0;N=((A>>>16)+(B>>>16)|0)+(M>>>16)|0;P=N>>>16;e[y+R+S>>2]=M&65535|N<<16}e[y+R+S>>2]=D+P|0}e[z+R>>2]=I<<16|J;D=e[y+Q>>2]|0}if(C){E=e[y>>2]|0;for(Q=4;(Q|0)<=(x|0);Q=Q+4|0){A=e[y+Q>>2]|0;e[y+Q-4>>2]=A<<(32-C|0)|E>>>C;E=A}e[y+x>>2]=E>>>C}}function t(u,v,w,x,y,z){u=u|0;v=v|0;w=w|0;x=x|0;y=y|0;z=z|0;var A=0,B=0,C=0,D=0,E=0,F=0,G=0,H=0,I=0,J=0,K=0,L=0,M=0,N=0;A=h(x<<1)|0;k(x<<1,0,A);j(v,u,A);for(L=0;(L|0)<(x|0);L=L+4|0){C=e[A+L>>2]|0,D=C&65535,C=C>>>16;F=y>>>16,E=y&65535;G=f(D,E)|0,H=((f(D,F)|0)+(f(C,E)|0)|0)+(G>>>16)|0;D=G&65535,C=H&65535;K=0;for(M=0;(M|0)<(x|0);M=M+4|0){N=L+M|0;F=e[w+M>>2]|0,E=F&65535,F=F>>>16;J=e[A+N>>2]|0;G=((f(D,E)|0)+(K&65535)|0)+(J&65535)|0;H=((f(D,F)|0)+(K>>>16)|0)+(J>>>16)|0;I=((f(C,E)|0)+(H&65535)|0)+(G>>>16)|0;K=((f(C,F)|0)+(I>>>16)|0)+(H>>>16)|0;J=I<<16|G&65535;e[A+N>>2]=J}N=L+M|0;J=e[A+N>>2]|0;G=((J&65535)+(K&65535)|0)+B|0;H=((J>>>16)+(K>>>16)|0)+(G>>>16)|0;e[A+N>>2]=H<<16|G&65535;B=H>>>16}j(x,A+x|0,z);i(x<<1);if(B|(m(w,x,z,x)|0)<=0){p(z,x,w,x,z,x)|0}}return{sreset:g,salloc:h,sfree:i,z:k,tst:n,neg:l,cmp:m,add:o,sub:p,mul:q,sqr:r,div:s,mredc:t}}function _b(a){return a instanceof ac}function ac(a){var b=Ud,c=0,d=0;if(n(a)&&(a=f(a)),o(a)&&(a=new Uint8Array(a)),void 0===a);else if(m(a)){var e=Math.abs(a);e>4294967295?(b=new Uint32Array(2),b[0]=0|e,b[1]=e/4294967296|0,c=52):e>0?(b=new Uint32Array(1),b[0]=e,c=32):(b=Ud,c=0),d=0>a?-1:1}else if(p(a)){if(c=8*a.length,!c)return Wd;b=new Uint32Array(c+31>>5);for(var g=a.length-4;g>=0;g-=4)b[a.length-4-g>>2]=a[g]<<24|a[g+1]<<16|a[g+2]<<8|a[g+3];-3===g?b[b.length-1]=a[0]:-2===g?b[b.length-1]=a[0]<<8|a[1]:-1===g&&(b[b.length-1]=a[0]<<16|a[1]<<8|a[2]),d=1}else{if("object"!=typeof a||null===a)throw new TypeError("number is of unexpected type");b=new Uint32Array(a.limbs),c=a.bitLength,d=a.sign}this.limbs=b,this.bitLength=c,this.sign=d}function bc(a){a=a||16;var b=this.limbs,c=this.bitLength,e="";if(16!==a)throw new d("bad radix");for(var f=(c+31>>5)-1;f>=0;f--){var g=b[f].toString(16);e+="00000000".substr(g.length),e+=g}return e=e.replace(/^0+/,""),e.length||(e="0"),this.sign<0&&(e="-"+e),e}function cc(){var a=this.bitLength,b=this.limbs;if(0===a)return new Uint8Array(0);for(var c=a+7>>3,d=new Uint8Array(c),e=0;c>e;e++){var f=c-e-1;d[e]=b[f>>2]>>((3&f)<<3)}return d}function dc(){var a=this.limbs,b=this.bitLength,c=this.sign;if(!c)return 0;if(32>=b)return c*(a[0]>>>0);if(52>=b)return c*(4294967296*(a[1]>>>0)+(a[0]>>>0));var d,e,f=0;for(d=a.length-1;d>=0;d--)if(0!==(e=a[d])){for(;0===(e<<f&2147483648);)f++;break}return 0===d?c*(a[0]>>>0):c*(1048576*((a[d]<<f|(f?a[d-1]>>>32-f:0))>>>0)+((a[d-1]<<f|(f&&d>1?a[d-2]>>>32-f:0))>>>12))*Math.pow(2,32*d-f-52)}function ec(a){var b=this.limbs,c=this.bitLength;if(a>=c)return this;var d=new ac,e=a+31>>5,f=a%32;return d.limbs=new Uint32Array(b.subarray(0,e)),d.bitLength=a,d.sign=this.sign,f&&(d.limbs[e-1]&=-1>>>32-f),d}function fc(a,b){if(!m(a))throw new TypeError("TODO");if(void 0!==b&&!m(b))throw new TypeError("TODO");var c=this.limbs,d=this.bitLength;if(0>a)throw new RangeError("TODO");if(a>=d)return Wd;(void 0===b||b>d-a)&&(b=d-a);var e,f=new ac,g=a>>5,h=a+b+31>>5,i=b+31>>5,j=a%32,k=b%32;if(e=new Uint32Array(i),j){for(var l=0;h-g-1>l;l++)e[l]=c[g+l]>>>j|c[g+l+1]<<32-j;e[l]=c[g+l]>>>j}else e.set(c.subarray(g,h));return k&&(e[i-1]&=-1>>>32-k),f.limbs=e,f.bitLength=b,f.sign=this.sign,f}function gc(){var a=new ac;return a.limbs=this.limbs,a.bitLength=this.bitLength,a.sign=-1*this.sign,a}function hc(a){_b(a)||(a=new ac(a));var b=this.limbs,c=b.length,d=a.limbs,e=d.length,f=0;return this.sign<a.sign?-1:this.sign>a.sign?1:(Td.set(b,0),Td.set(d,c),f=$b.cmp(0,c<<2,c<<2,e<<2),f*this.sign)}function ic(a){if(_b(a)||(a=new ac(a)),!this.sign)return a;if(!a.sign)return this;var b,c,d,e,f=this.bitLength,g=this.limbs,h=g.length,i=this.sign,j=a.bitLength,k=a.limbs,l=k.length,m=a.sign,n=new ac;b=(f>j?f:j)+(i*m>0?1:0),c=b+31>>5,$b.sreset();var o=$b.salloc(h<<2),p=$b.salloc(l<<2),q=$b.salloc(c<<2);return $b.z(q-o+(c<<2),0,o),Td.set(g,o>>2),Td.set(k,p>>2),i*m>0?($b.add(o,h<<2,p,l<<2,q,c<<2),d=i):i>m?(e=$b.sub(o,h<<2,p,l<<2,q,c<<2),d=e?m:i):(e=$b.sub(p,l<<2,o,h<<2,q,c<<2),d=e?i:m),e&&$b.neg(q,c<<2,q,c<<2),0===$b.tst(q,c<<2)?Wd:(n.limbs=new Uint32Array(Td.subarray(q>>2,(q>>2)+c)),n.bitLength=b,n.sign=d,n)}function jc(a){return _b(a)||(a=new ac(a)),this.add(a.negate())}function kc(a){if(_b(a)||(a=new ac(a)),!this.sign||!a.sign)return Wd;var b,c,d=this.bitLength,e=this.limbs,f=e.length,g=a.bitLength,h=a.limbs,i=h.length,j=new ac;b=d+g,c=b+31>>5,$b.sreset();var k=$b.salloc(f<<2),l=$b.salloc(i<<2),m=$b.salloc(c<<2);return $b.z(m-k+(c<<2),0,k),Td.set(e,k>>2),Td.set(h,l>>2),$b.mul(k,f<<2,l,i<<2,m,c<<2),j.limbs=new Uint32Array(Td.subarray(m>>2,(m>>2)+c)),j.sign=this.sign*a.sign,j.bitLength=b,j}function lc(){if(!this.sign)return Wd;var a,b,c=this.bitLength,d=this.limbs,e=d.length,f=new ac;a=c<<1,b=a+31>>5,$b.sreset();var g=$b.salloc(e<<2),h=$b.salloc(b<<2);return $b.z(h-g+(b<<2),0,g),Td.set(d,g>>2),$b.sqr(g,e<<2,h),f.limbs=new Uint32Array(Td.subarray(h>>2,(h>>2)+b)),f.bitLength=a,f.sign=1,f}function mc(a){_b(a)||(a=new ac(a));var b,c,d=this.bitLength,e=this.limbs,f=e.length,g=a.bitLength,h=a.limbs,i=h.length,j=Wd,k=Wd;$b.sreset();var l=$b.salloc(f<<2),m=$b.salloc(i<<2),n=$b.salloc(i<<2),o=$b.salloc(f<<2);return $b.z(o-l+(f<<2),0,l),Td.set(e,l>>2),Td.set(h,m>>2),$b.div(l,f<<2,m,i<<2,n,o),b=$b.tst(o,f<<2)>>2,b&&(j=new ac,j.limbs=new Uint32Array(Td.subarray(o>>2,(o>>2)+b)),j.bitLength=b<<5>d?d:b<<5,j.sign=this.sign*a.sign),c=$b.tst(n,i<<2)>>2,c&&(k=new ac,k.limbs=new Uint32Array(Td.subarray(n>>2,(n>>2)+c)),k.bitLength=c<<5>g?g:c<<5,k.sign=this.sign),{quotient:j,remainder:k}}function nc(a,b){var c,d,e,f,g=0>a?-1:1,h=0>b?-1:1,i=1,j=0,k=0,l=1;for(a*=g,b*=h,f=b>a,f&&(e=a,a=b,b=e,e=g,g=h,h=e),d=Math.floor(a/b),c=a-d*b;c;)e=i-d*j,i=j,j=e,e=k-d*l,k=l,l=e,a=b,b=c,d=Math.floor(a/b),c=a-d*b;return j*=g,l*=h,f&&(e=j,j=l,l=e),{gcd:b,x:j,y:l}}function oc(a,b){_b(a)||(a=new ac(a)),_b(b)||(b=new ac(b));var c=a.sign,d=b.sign;0>c&&(a=a.negate()),0>d&&(b=b.negate());var e=a.compare(b);if(0>e){var f=a;a=b,b=f,f=c,c=d,d=f}var g,h,i,j=Xd,k=Wd,l=b.bitLength,m=Wd,n=Xd,o=a.bitLength;for(g=a.divide(b);(h=g.remainder)!==Wd;)i=g.quotient,g=j.subtract(i.multiply(k).clamp(l)).clamp(l),j=k,k=g,g=m.subtract(i.multiply(n).clamp(o)).clamp(o),m=n,n=g,a=b,b=h,g=a.divide(b);if(0>c&&(k=k.negate()),0>d&&(n=n.negate()),0>e){var f=k;k=n,n=f}return{gcd:b,x:k,y:n}}function pc(){if(ac.apply(this,arguments),this.valueOf()<1)throw new RangeError;if(!(this.bitLength<=32)){var a;if(1&this.limbs[0]){var b=(this.bitLength+31&-32)+1,c=new Uint32Array(b+31>>5);c[c.length-1]=1,a=new ac,a.sign=1,a.bitLength=b,a.limbs=c;var d=nc(4294967296,this.limbs[0]).y;this.coefficient=0>d?-d:4294967296-d,this.comodulus=a,this.comodulusRemainder=a.divide(this).remainder,this.comodulusRemainderSquare=a.square().divide(this).remainder}}}function qc(a){return _b(a)||(a=new ac(a)),a.bitLength<=32&&this.bitLength<=32?new ac(a.valueOf()%this.valueOf()):a.compare(this)<0?a:a.divide(this).remainder}function rc(a){a=this.reduce(a);var b=oc(this,a);return 1!==b.gcd.valueOf()?null:(b=b.y,b.sign<0&&(b=b.add(this).clamp(this.bitLength)),b)}function sc(a,b){_b(a)||(a=new ac(a)),_b(b)||(b=new ac(b));for(var c=0,d=0;d<b.limbs.length;d++)for(var e=b.limbs[d];e;)1&e&&c++,e>>>=1;var f=8;b.bitLength<=4536&&(f=7),b.bitLength<=1736&&(f=6),b.bitLength<=630&&(f=5),b.bitLength<=210&&(f=4),b.bitLength<=60&&(f=3),b.bitLength<=12&&(f=2),1<<f-1>=c&&(f=1),a=tc(this.reduce(a).multiply(this.comodulusRemainderSquare),this);var g=tc(a.square(),this),h=new Array(1<<f-1);h[0]=a,h[1]=tc(a.multiply(g),this);for(var d=2;1<<f-1>d;d++)h[d]=tc(h[d-1].multiply(g),this);for(var i=this.comodulusRemainder,j=i,d=b.limbs.length-1;d>=0;d--)for(var e=b.limbs[d],k=32;k>0;)if(2147483648&e){for(var l=e>>>32-f,m=f;0===(1&l);)l>>>=1,m--;for(var n=h[l>>>1];l;)l>>>=1,j!==i&&(j=tc(j.square(),this));j=j!==i?tc(j.multiply(n),this):n,e<<=m,k-=m}else j!==i&&(j=tc(j.square(),this)),e<<=1,k--;return j=tc(j,this)}function tc(a,b){var c=a.limbs,d=c.length,e=b.limbs,f=e.length,g=b.coefficient;$b.sreset();var h=$b.salloc(d<<2),i=$b.salloc(f<<2),j=$b.salloc(f<<2);$b.z(j-h+(f<<2),0,h),Td.set(c,h>>2),Td.set(e,i>>2),$b.mredc(h,d<<2,i,f<<2,g,j);var k=new ac;return k.limbs=new Uint32Array(Td.subarray(j>>2,(j>>2)+f)),k.bitLength=b.bitLength,k.sign=1,k}function uc(a){var b=new ac(this),c=0;for(b.limbs[0]-=1;0===b.limbs[c>>5];)c+=32;for(;0===(b.limbs[c>>5]>>(31&c)&1);)c++;b=b.slice(c);for(var d=new pc(this),e=this.subtract(Xd),f=new ac(this),g=this.limbs.length-1;0===f.limbs[g];)g--;for(;--a>=0;){for(Xb(f.limbs),f.limbs[0]<2&&(f.limbs[0]+=2);f.compare(e)>=0;)f.limbs[g]>>>=1;var h=d.power(f,b);if(0!==h.compare(Xd)&&0!==h.compare(e)){for(var i=c;--i>0;){if(h=h.square().divide(d).remainder,0===h.compare(Xd))return!1;if(0===h.compare(e))break}if(0===i)return!1}}return!0}function vc(a){a=a||80;var b=this.limbs,c=0;if(0===(1&b[0]))return!1;if(1>=a)return!0;var d=0,e=0,f=0;for(c=0;c<b.length;c++){for(var g=b[c];g;)d+=3&g,g>>>=2;for(var h=b[c];h;)e+=3&h,h>>>=2,e-=3&h,h>>>=2;for(var i=b[c];i;)f+=15&i,i>>>=4,f-=15&i,i>>>=4}return d%3&&e%5&&f%17?2>=a?!0:uc.call(this,a>>>1):!1}function wc(a){if(Zd.length>=a)return Zd.slice(0,a);for(var b=Zd[Zd.length-1]+2;Zd.length<a;b+=2){for(var c=0,d=Zd[c];b>=d*d&&b%d!=0;d=Zd[++c]);d*d>b&&Zd.push(b)}return Zd}function xc(a,c){var d=a+31>>5,e=new ac({sign:1,bitLength:a,limbs:d}),f=e.limbs,g=1e4;512>=a&&(g=2200),256>=a&&(g=600);var h=wc(g),i=new Uint32Array(g),j=a*b.Math.LN2|0,k=27;for(a>=250&&(k=12),a>=450&&(k=6),a>=850&&(k=3),a>=1300&&(k=2);;){Xb(f),f[0]|=1,f[d-1]|=1<<(a-1&31),31&a&&(f[d-1]&=l(a+1&31)-1),i[0]=1;for(var m=1;g>m;m++)i[m]=e.divide(h[m]).remainder.valueOf();a:for(var n=0;j>n;n+=2,f[0]+=2){for(var m=1;g>m;m++)if((i[m]+n)%h[m]===0)continue a;if(("function"!=typeof c||c(e))&&uc.call(e,k))return e}}}function yc(a){a=a||{},this.key=null,this.result=null,this.reset(a)}function zc(a){a=a||{},this.result=null;var b=a.key;if(void 0!==b){if(!(b instanceof Array))throw new TypeError("unexpected key type");var c=b.length;if(2!==c&&3!==c&&8!==c)throw new SyntaxError("unexpected key type");var d=[];d[0]=new pc(b[0]),d[1]=new ac(b[1]),c>2&&(d[2]=new ac(b[2])),c>3&&(d[3]=new pc(b[3]),d[4]=new pc(b[4]),d[5]=new ac(b[5]),d[6]=new ac(b[6]),d[7]=new ac(b[7])),this.key=d}return this}function Ac(a){if(!this.key)throw new c("no key is associated with the instance");n(a)&&(a=f(a)),o(a)&&(a=new Uint8Array(a));var b;if(p(a))b=new ac(a);else{if(!_b(a))throw new TypeError("unexpected data type");b=a}if(this.key[0].compare(b)<=0)throw new RangeError("data too large");var d=this.key[0],e=this.key[1],g=d.power(b,e).toBytes(),h=d.bitLength+7>>3;if(g.length<h){var i=new Uint8Array(h);i.set(g,h-g.length),g=i}return this.result=g,this}function Bc(a){if(!this.key)throw new c("no key is associated with the instance");if(this.key.length<3)throw new c("key isn't suitable for decription");n(a)&&(a=f(a)),o(a)&&(a=new Uint8Array(a));var b;if(p(a))b=new ac(a);else{if(!_b(a))throw new TypeError("unexpected data type");b=a}if(this.key[0].compare(b)<=0)throw new RangeError("data too large");var d;if(this.key.length>3){for(var e=this.key[0],g=this.key[3],h=this.key[4],i=this.key[5],j=this.key[6],k=this.key[7],l=g.power(b,i),m=h.power(b,j),q=l.subtract(m);q.sign<0;)q=q.add(g);var r=g.reduce(k.multiply(q));d=r.multiply(h).add(m).clamp(e.bitLength).toBytes()}else{var e=this.key[0],s=this.key[2];d=e.power(b,s).toBytes()}var t=e.bitLength+7>>3;if(d.length<t){var u=new Uint8Array(t);u.set(d,t-d.length),d=u}return this.result=d,this}function Cc(a,b){if(a=a||2048,b=b||65537,512>a)throw new d("bit length is too small");if(n(b)&&(b=f(b)),o(b)&&(b=new Uint8Array(b)),!(p(b)||m(b)||_b(b)))throw new TypeError("unexpected exponent type");if(b=new ac(b),0===(1&b.limbs[0]))throw new d("exponent must be an odd number");var c,b,e,g,h,i,j,k,l,q;g=xc(a>>1,function(a){return i=new ac(a),i.limbs[0]-=1,1==oc(i,b).gcd.valueOf()}),h=xc(a-(a>>1),function(d){return c=new pc(g.multiply(d)),c.limbs[(a+31>>5)-1]>>>(a-1&31)?(j=new ac(d),j.limbs[0]-=1,1==oc(j,b).gcd.valueOf()):!1}),e=new pc(i.multiply(j)).inverse(b),k=e.divide(i).remainder,l=e.divide(j).remainder,g=new pc(g),h=new pc(h);var q=g.inverse(h);return[c,b,e,g,h,k,l,q]}function Dc(a){if(a=a||{},!a.hash)throw new SyntaxError("option 'hash' is required");if(!a.hash.HASH_SIZE)throw new SyntaxError("option 'hash' supplied doesn't seem to be a valid hash function");this.hash=a.hash,this.label=null,this.reset(a)}function Ec(a){a=a||{};var b=a.label;if(void 0!==b){if(o(b)||p(b))b=new Uint8Array(b);else{if(!n(b))throw new TypeError("unexpected label type");b=f(b)}this.label=b.length>0?b:null}else this.label=null;zc.call(this,a)}function Fc(a){if(!this.key)throw new c("no key is associated with the instance");var b=Math.ceil(this.key[0].bitLength/8),e=this.hash.HASH_SIZE,g=a.byteLength||a.length||0,h=b-g-2*e-2;if(g>b-2*this.hash.HASH_SIZE-2)throw new d("data too large");var i=new Uint8Array(b),j=i.subarray(1,e+1),k=i.subarray(e+1);if(p(a))k.set(a,e+h+1);else if(o(a))k.set(new Uint8Array(a),e+h+1);else{if(!n(a))throw new TypeError("unexpected data type");k.set(f(a),e+h+1)}k.set(this.hash.reset().process(this.label||"").finish().result,0),k[e+h]=1,Xb(j);for(var l=Hc.call(this,j,k.length),m=0;m<k.length;m++)k[m]^=l[m];for(var q=Hc.call(this,k,j.length),m=0;m<j.length;m++)j[m]^=q[m];return Ac.call(this,i),this}function Gc(a){if(!this.key)throw new c("no key is associated with the instance");var b=Math.ceil(this.key[0].bitLength/8),f=this.hash.HASH_SIZE,g=a.byteLength||a.length||0;if(g!==b)throw new d("bad data");Bc.call(this,a);var h=this.result[0],i=this.result.subarray(1,f+1),j=this.result.subarray(f+1);if(0!==h)throw new e("decryption failed");for(var k=Hc.call(this,j,i.length),l=0;l<i.length;l++)i[l]^=k[l];for(var m=Hc.call(this,i,j.length),l=0;l<j.length;l++)j[l]^=m[l];for(var n=this.hash.reset().process(this.label||"").finish().result,l=0;f>l;l++)if(n[l]!==j[l])throw new e("decryption failed");for(var o=f;o<j.length;o++){var p=j[o];if(1===p)break;if(0!==p)throw new e("decryption failed")}if(o===j.length)throw new e("decryption failed");return this.result=j.subarray(o+1),this}function Hc(a,b){a=a||"",b=b||0;for(var c=this.hash.HASH_SIZE,d=new Uint8Array(b),e=new Uint8Array(4),f=Math.ceil(b/c),g=0;f>g;g++){e[0]=g>>>24,e[1]=g>>>16&255,e[2]=g>>>8&255,e[3]=255&g;var h=d.subarray(g*c),i=this.hash.reset().process(a).process(e).finish().result;i.length>h.length&&(i=i.subarray(0,h.length)),h.set(i)}return d}function Ic(a){if(a=a||{},!a.hash)throw new SyntaxError("option 'hash' is required");if(!a.hash.HASH_SIZE)throw new SyntaxError("option 'hash' supplied doesn't seem to be a valid hash function");this.hash=a.hash,this.saltLength=4,this.reset(a)}function Jc(a){a=a||{},zc.call(this,a);var b=a.saltLength;if(void 0!==b){if(!m(b)||0>b)throw new TypeError("saltLength should be a non-negative number");if(null!==this.key&&Math.ceil((this.key[0].bitLength-1)/8)<this.hash.HASH_SIZE+b+2)throw new SyntaxError("saltLength is too large");this.saltLength=b}else this.saltLength=4}function Kc(a){if(!this.key)throw new c("no key is associated with the instance");var b=this.key[0].bitLength,d=this.hash.HASH_SIZE,e=Math.ceil((b-1)/8),f=this.saltLength,g=e-f-d-2,h=new Uint8Array(e),i=h.subarray(e-d-1,e-1),j=h.subarray(0,e-d-1),k=j.subarray(g+1),l=new Uint8Array(8+d+f),m=l.subarray(8,8+d),n=l.subarray(8+d);m.set(this.hash.reset().process(a).finish().result),f>0&&Xb(n),j[g]=1,k.set(n),i.set(this.hash.reset().process(l).finish().result);for(var o=Hc.call(this,i,j.length),p=0;p<j.length;p++)j[p]^=o[p];h[e-1]=188;var q=8*e-b+1;return q%8&&(h[0]&=255>>>q),Bc.call(this,h),this}function Lc(a,b){if(!this.key)throw new c("no key is associated with the instance");var d=this.key[0].bitLength,f=this.hash.HASH_SIZE,g=Math.ceil((d-1)/8),h=this.saltLength,i=g-h-f-2;Ac.call(this,a);var j=this.result;if(188!==j[g-1])throw new e("bad signature");var k=j.subarray(g-f-1,g-1),l=j.subarray(0,g-f-1),m=l.subarray(i+1),n=8*g-d+1;if(n%8&&j[0]>>>8-n)throw new e("bad signature");for(var o=Hc.call(this,k,l.length),p=0;p<l.length;p++)l[p]^=o[p];n%8&&(j[0]&=255>>>n);for(var p=0;i>p;p++)if(0!==l[p])throw new e("bad signature");if(1!==l[i])throw new e("bad signature");var q=new Uint8Array(8+f+h),r=q.subarray(8,8+f),s=q.subarray(8+f);r.set(this.hash.reset().process(b).finish().result),s.set(m);for(var t=this.hash.reset().process(q).finish().result,p=0;f>p;p++)if(k[p]!==t[p])throw new e("bad signature");return this}function Mc(a,b){if(void 0===a)throw new SyntaxError("bitlen required");if(void 0===b)throw new SyntaxError("e required");for(var c=Cc(a,b),d=0;d<c.length;d++)_b(c[d])&&(c[d]=c[d].toBytes());return c}function Nc(a,b,c){if(void 0===a)throw new SyntaxError("data required");if(void 0===b)throw new SyntaxError("key required");return new Dc({hash:_(),key:b,label:c}).encrypt(a).result}function Oc(a,b,c){if(void 0===a)throw new SyntaxError("data required");if(void 0===b)throw new SyntaxError("key required");return new Dc({hash:_(),key:b,label:c}).decrypt(a).result}function Pc(a,b,c){if(void 0===a)throw new SyntaxError("data required");if(void 0===b)throw new SyntaxError("key required");return new Dc({hash:ib(),key:b,label:c}).encrypt(a).result}function Qc(a,b,c){if(void 0===a)throw new SyntaxError("data required");if(void 0===b)throw new SyntaxError("key required");return new Dc({hash:ib(),key:b,label:c}).decrypt(a).result}function Rc(a,b,c){if(void 0===a)throw new SyntaxError("data required");if(void 0===b)throw new SyntaxError("key required");return new Ic({hash:_(),key:b,saltLength:c}).sign(a).result}function Sc(a,b,c,d){if(void 0===a)throw new SyntaxError("signature required");if(void 0===b)throw new SyntaxError("data required");if(void 0===c)throw new SyntaxError("key required");try{return new Ic({hash:_(),key:c,saltLength:d}).verify(a,b),!0}catch(f){if(!(f instanceof e))throw f}return!1}function Tc(a,b,c){if(void 0===a)throw new SyntaxError("data required");if(void 0===b)throw new SyntaxError("key required");return new Ic({hash:ib(),key:b,saltLength:c}).sign(a).result}function Uc(a,b,c,d){if(void 0===a)throw new SyntaxError("signature required");if(void 0===b)throw new SyntaxError("data required");if(void 0===c)throw new SyntaxError("key required");try{return new Ic({hash:ib(),key:c,saltLength:d}).verify(a,b),!0}catch(f){if(!(f instanceof e))throw f}return!1}b.asmCrypto=a,c.prototype=Object.create(Error.prototype,{name:{value:"IllegalStateError"}}),d.prototype=Object.create(Error.prototype,{name:{value:"IllegalArgumentError"}}),e.prototype=Object.create(Error.prototype,{name:{value:"SecurityError"}});var Vc=b.Float64Array||b.Float32Array;a.string_to_bytes=f,a.hex_to_bytes=g,a.base64_to_bytes=h,a.bytes_to_string=i,a.bytes_to_hex=j,a.bytes_to_base64=k,b.IllegalStateError=c,b.IllegalArgumentError=d,b.SecurityError=e;var Wc=[99,124,119,123,242,107,111,197,48,1,103,43,254,215,171,118,202,130,201,125,250,89,71,240,173,212,162,175,156,164,114,192,183,253,147,38,54,63,247,204,52,165,229,241,113,216,49,21,4,199,35,195,24,150,5,154,7,18,128,226,235,39,178,117,9,131,44,26,27,110,90,160,82,59,214,179,41,227,47,132,83,209,0,237,32,252,177,91,106,203,190,57,74,76,88,207,208,239,170,251,67,77,51,133,69,249,2,127,80,60,159,168,81,163,64,143,146,157,56,245,188,182,218,33,16,255,243,210,205,12,19,236,95,151,68,23,196,167,126,61,100,93,25,115,96,129,79,220,34,42,144,136,70,238,184,20,222,94,11,219,224,50,58,10,73,6,36,92,194,211,172,98,145,149,228,121,231,200,55,109,141,213,78,169,108,86,244,234,101,122,174,8,186,120,37,46,28,166,180,198,232,221,116,31,75,189,139,138,112,62,181,102,72,3,246,14,97,53,87,185,134,193,29,158,225,248,152,17,105,217,142,148,155,30,135,233,206,85,40,223,140,161,137,13,191,230,66,104,65,153,45,15,176,84,187,22,82,9,106,213,48,54,165,56,191,64,163,158,129,243,215,251,124,227,57,130,155,47,255,135,52,142,67,68,196,222,233,203,84,123,148,50,166,194,35,61,238,76,149,11,66,250,195,78,8,46,161,102,40,217,36,178,118,91,162,73,109,139,209,37,114,248,246,100,134,104,152,22,212,164,92,204,93,101,182,146,108,112,72,80,253,237,185,218,94,21,70,87,167,141,157,132,144,216,171,0,140,188,211,10,247,228,88,5,184,179,69,6,208,44,30,143,202,63,15,2,193,175,189,3,1,19,138,107,58,145,17,65,79,103,220,234,151,242,207,206,240,180,230,115,150,172,116,34,231,173,53,133,226,249,55,232,28,117,223,110,71,241,26,113,29,41,197,137,111,183,98,14,170,24,190,27,252,86,62,75,198,210,121,32,154,219,192,254,120,205,90,244,31,221,168,51,136,7,199,49,177,18,16,89,39,128,236,95,96,81,127,169,25,181,74,13,45,229,122,159,147,201,156,239,160,224,59,77,174,42,245,176,200,235,187,60,131,83,153,97,23,43,4,126,186,119,214,38,225,105,20,99,85,33,12,125,198,248,238,246,255,214,222,145,96,2,206,86,231,181,77,236,143,31,137,250,239,178,142,251,65,179,95,69,35,83,228,155,117,225,61,76,108,126,245,131,104,81,209,249,226,171,98,42,8,149,70,157,48,55,10,47,14,36,27,223,205,78,127,234,18,29,88,52,54,220,180,91,164,118,183,125,82,221,94,19,166,185,0,193,64,227,121,182,212,141,103,114,148,152,176,133,187,197,79,237,134,154,102,17,138,233,4,254,160,120,37,75,162,93,128,5,63,33,112,241,99,119,175,66,32,229,253,191,129,24,38,195,190,53,136,46,147,85,252,122,200,186,50,230,192,25,158,163,68,84,59,11,140,199,107,40,167,188,22,173,219,100,116,20,146,12,72,184,159,189,67,196,57,49,211,242,213,139,110,218,1,177,156,73,216,172,243,207,202,244,71,16,111,240,74,92,56,87,115,151,203,161,232,62,150,97,13,15,224,124,113,204,144,6,247,28,194,106,174,105,23,153,58,39,217,235,43,34,210,169,7,51,45,60,21,201,135,170,80,165,3,89,9,26,101,215,132,208,130,41,90,30,123,168,109,44,165,132,153,141,13,189,177,84,80,3,169,125,25,98,230,154,69,157,64,135,21,235,201,11,236,103,253,234,191,247,150,91,194,28,174,106,90,65,2,79,92,244,52,8,147,115,83,63,12,82,101,94,40,161,15,181,9,54,155,61,38,105,205,159,27,158,116,46,45,178,238,251,246,77,97,206,123,62,113,151,245,104,0,44,96,31,200,237,190,70,217,75,222,212,232,74,107,42,229,22,197,215,85,148,207,16,6,129,240,68,186,227,243,254,192,138,173,188,72,4,223,193,117,99,48,26,14,109,76,20,53,47,225,162,204,57,87,242,130,71,172,231,43,149,160,152,209,127,102,126,171,131,202,41,211,60,121,226,29,118,59,86,78,30,219,10,108,228,93,110,239,166,168,164,55,139,50,67,89,183,140,100,210,224,180,250,7,37,175,142,233,24,213,136,111,114,36,241,199,81,35,124,156,33,221,220,134,133,144,66,196,170,216,5,1,18,163,95,249,208,145,88,39,185,56,19,179,51,187,112,137,167,182,34,146,32,73,255,120,122,143,248,128,23,218,49,198,184,195,176,119,17,203,252,214,58,0,9,18,27,36,45,54,63,72,65,90,83,108,101,126,119,144,153,130,139,180,189,166,175,216,209,202,195,252,245,238,231,59,50,41,32,31,22,13,4,115,122,97,104,87,94,69,76,171,162,185,176,143,134,157,148,227,234,241,248,199,206,213,220,118,127,100,109,82,91,64,73,62,55,44,37,26,19,8,1,230,239,244,253,194,203,208,217,174,167,188,181,138,131,152,145,77,68,95,86,105,96,123,114,5,12,23,30,33,40,51,58,221,212,207,198,249,240,235,226,149,156,135,142,177,184,163,170,236,229,254,247,200,193,218,211,164,173,182,191,128,137,146,155,124,117,110,103,88,81,74,67,52,61,38,47,16,25,2,11,215,222,197,204,243,250,225,232,159,150,141,132,187,178,169,160,71,78,85,92,99,106,113,120,15,6,29,20,43,34,57,48,154,147,136,129,190,183,172,165,210,219,192,201,246,255,228,237,10,3,24,17,46,39,60,53,66,75,80,89,102,111,116,125,161,168,179,186,133,140,151,158,233,224,251,242,205,196,223,214,49,56,35,42,21,28,7,14,121,112,107,98,93,84,79,70,0,11,22,29,44,39,58,49,88,83,78,69,116,127,98,105,176,187,166,173,156,151,138,129,232,227,254,245,196,207,210,217,123,112,109,102,87,92,65,74,35,40,53,62,15,4,25,18,203,192,221,214,231,236,241,250,147,152,133,142,191,180,169,162,246,253,224,235,218,209,204,199,174,165,184,179,130,137,148,159,70,77,80,91,106,97,124,119,30,21,8,3,50,57,36,47,141,134,155,144,161,170,183,188,213,222,195,200,249,242,239,228,61,54,43,32,17,26,7,12,101,110,115,120,73,66,95,84,247,252,225,234,219,208,205,198,175,164,185,178,131,136,149,158,71,76,81,90,107,96,125,118,31,20,9,2,51,56,37,46,140,135,154,145,160,171,182,189,212,223,194,201,248,243,238,229,60,55,42,33,16,27,6,13,100,111,114,121,72,67,94,85,1,10,23,28,45,38,59,48,89,82,79,68,117,126,99,104,177,186,167,172,157,150,139,128,233,226,255,244,197,206,211,216,122,113,108,103,86,93,64,75,34,41,52,63,14,5,24,19,202,193,220,215,230,237,240,251,146,153,132,143,190,181,168,163,0,13,26,23,52,57,46,35,104,101,114,127,92,81,70,75,208,221,202,199,228,233,254,243,184,181,162,175,140,129,150,155,187,182,161,172,143,130,149,152,211,222,201,196,231,234,253,240,107,102,113,124,95,82,69,72,3,14,25,20,55,58,45,32,109,96,119,122,89,84,67,78,5,8,31,18,49,60,43,38,189,176,167,170,137,132,147,158,213,216,207,194,225,236,251,246,214,219,204,193,226,239,248,245,190,179,164,169,138,135,144,157,6,11,28,17,50,63,40,37,110,99,116,121,90,87,64,77,218,215,192,205,238,227,244,249,178,191,168,165,134,139,156,145,10,7,16,29,62,51,36,41,98,111,120,117,86,91,76,65,97,108,123,118,85,88,79,66,9,4,19,30,61,48,39,42,177,188,171,166,133,136,159,146,217,212,195,206,237,224,247,250,183,186,173,160,131,142,153,148,223,210,197,200,235,230,241,252,103,106,125,112,83,94,73,68,15,2,21,24,59,54,33,44,12,1,22,27,56,53,34,47,100,105,126,115,80,93,74,71,220,209,198,203,232,229,242,255,180,185,174,163,128,141,154,151,0,14,28,18,56,54,36,42,112,126,108,98,72,70,84,90,224,238,252,242,216,214,196,202,144,158,140,130,168,166,180,186,219,213,199,201,227,237,255,241,171,165,183,185,147,157,143,129,59,53,39,41,3,13,31,17,75,69,87,89,115,125,111,97,173,163,177,191,149,155,137,135,221,211,193,207,229,235,249,247,77,67,81,95,117,123,105,103,61,51,33,47,5,11,25,23,118,120,106,100,78,64,82,92,6,8,26,20,62,48,34,44,150,152,138,132,174,160,178,188,230,232,250,244,222,208,194,204,65,79,93,83,121,119,101,107,49,63,45,35,9,7,21,27,161,175,189,179,153,151,133,139,209,223,205,195,233,231,245,251,154,148,134,136,162,172,190,176,234,228,246,248,210,220,206,192,122,116,102,104,66,76,94,80,10,4,22,24,50,60,46,32,236,226,240,254,212,218,200,198,156,146,128,142,164,170,184,182,12,2,16,30,52,58,40,38,124,114,96,110,68,74,88,86,55,57,43,37,15,1,19,29,71,73,91,85,127,113,99,109,215,217,203,197,239,225,243,253,167,169,187,181,159,145,131,141],Xc=2048,Yc=16,Zc=y.prototype;Zc.reset=A,Zc.process=B,Zc.finish=C;var $c=z.prototype;$c.reset=A,$c.process=E,$c.finish=F;var _c=x.prototype;_c.reset=A,_c.encrypt=D,_c.decrypt=G;var ad=68719476704,bd=H.prototype;bd.reset=L,bd.encrypt=O,bd.decrypt=R;var cd=I.prototype;cd.reset=L,cd.process=M,cd.finish=N;var dd=J.prototype;dd.reset=L,dd.process=P,dd.finish=Q;var ed=new Uint8Array(1048576),r=s(b,null,ed.buffer),fd=new x({heap:ed,asm:r});a.AES_CBC={encrypt:S,decrypt:T};var gd=new H({heap:ed,asm:r});a.AES_GCM={encrypt:U,decrypt:V};var hd=64,id=20;X.BLOCK_SIZE=hd,X.HASH_SIZE=id;var jd=X.prototype;jd.reset=Y,jd.process=Z,jd.finish=$;var kd=null;a.SHA1={bytes:ab,hex:bb,base64:cb};var ld=64,md=32;eb.BLOCK_SIZE=ld,eb.HASH_SIZE=md;var nd=eb.prototype;nd.reset=fb,nd.process=gb,nd.finish=hb;var od=null;a.SHA256={bytes:jb,hex:kb,base64:lb};var pd=mb.prototype;pd.reset=pb,pd.process=qb,pd.finish=rb,sb.BLOCK_SIZE=X.BLOCK_SIZE,sb.HMAC_SIZE=X.HASH_SIZE;var qd=sb.prototype;qd.reset=tb,qd.process=qb,qd.finish=ub;var rd=null;wb.BLOCK_SIZE=eb.BLOCK_SIZE,wb.HMAC_SIZE=eb.HASH_SIZE;var sd=wb.prototype;sd.reset=xb,sd.process=qb,sd.finish=yb;var td=null;a.HMAC=a.HMAC_SHA1={bytes:Ab,hex:Bb,base64:Cb},a.HMAC_SHA256={bytes:Db,hex:Eb,base64:Fb};var ud=Gb.prototype;ud.reset=Hb,ud.generate=Ib;var vd=Jb.prototype;vd.reset=Hb,vd.generate=Kb;var wd=null,xd=Mb.prototype;xd.reset=Hb,xd.generate=Nb;var yd=null;a.PBKDF2=a.PBKDF2_HMAC_SHA1={bytes:Pb,hex:Qb,base64:Rb},a.PBKDF2_HMAC_SHA256={bytes:Sb,hex:Tb,base64:Ub};var zd,Ad=function(){function a(){function a(){b^=d<<11,l=l+b|0,d=d+f|0,d^=f>>>2,m=m+d|0,f=f+l|0,f^=l<<8,n=n+f|0,l=l+m|0,l^=m>>>16,o=o+l|0,m=m+n|0,m^=n<<10,p=p+m|0,n=n+o|0,n^=o>>>4,b=b+n|0,o=o+p|0,o^=p<<8,d=d+o|0,p=p+b|0,p^=b>>>9,f=f+p|0,b=b+d|0}var b,d,f,l,m,n,o,p;h=i=j=0,b=d=f=l=m=n=o=p=2654435769;for(var q=0;4>q;q++)a();for(var q=0;256>q;q+=8)b=b+g[0|q]|0,d=d+g[1|q]|0,f=f+g[2|q]|0,l=l+g[3|q]|0,m=m+g[4|q]|0,n=n+g[5|q]|0,o=o+g[6|q]|0,p=p+g[7|q]|0,a(),e.set([b,d,f,l,m,n,o,p],q);for(var q=0;256>q;q+=8)b=b+e[0|q]|0,d=d+e[1|q]|0,f=f+e[2|q]|0,l=l+e[3|q]|0,m=m+e[4|q]|0,n=n+e[5|q]|0,o=o+e[6|q]|0,p=p+e[7|q]|0,a(),e.set([b,d,f,l,m,n,o,p],q);c(1),k=256}function b(b){var c,d,e,h,i;if(q(b))b=new Uint8Array(b.buffer);else if(m(b))h=new Vc(1),h[0]=b,b=new Uint8Array(h.buffer);else if(n(b))b=f(b);else{if(!o(b))throw new TypeError("bad seed type");b=new Uint8Array(b)}for(i=b.length,d=0;i>d;d+=1024){for(e=d,c=0;1024>c&&i>e;e=d|++c)g[c>>2]^=b[e]<<((3&c)<<3);a()}}function c(a){a=a||1;for(var b,c,d;a--;)for(j=j+1|0,i=i+j|0,b=0;256>b;b+=4)h^=h<<13,h=e[b+128&255]+h|0,c=e[0|b],e[0|b]=d=e[c>>>2&255]+(h+i|0)|0,g[0|b]=i=e[d>>>10&255]+c|0,h^=h>>>6,h=e[b+129&255]+h|0,c=e[1|b],e[1|b]=d=e[c>>>2&255]+(h+i|0)|0,g[1|b]=i=e[d>>>10&255]+c|0,h^=h<<2,h=e[b+130&255]+h|0,c=e[2|b],e[2|b]=d=e[c>>>2&255]+(h+i|0)|0,g[2|b]=i=e[d>>>10&255]+c|0,h^=h>>>16,h=e[b+131&255]+h|0,c=e[3|b],e[3|b]=d=e[c>>>2&255]+(h+i|0)|0,g[3|b]=i=e[d>>>10&255]+c|0}function d(){return k--||(c(1),k=255),g[k]}var e=new Uint32Array(256),g=new Uint32Array(256),h=0,i=0,j=0,k=0;return{seed:b,prng:c,rand:d}}(),Bd=b.console,Cd=b.Date.now,Dd=b.Math.random,Ed=b.performance,Fd=b.crypto||b.msCrypto;void 0!==Fd&&(zd=Fd.getRandomValues);var Gd,Hd=Ad.rand,Id=Ad.seed,Jd=0,Kd=!1,Ld=!1,Md=0,Nd=256,Od=!1,Pd=!1,Qd={};if(void 0!==Ed)Gd=function(){return 1e3*Ed.now()|0};else{var Rd=1e3*Cd()|0;Gd=function(){return 1e3*Cd()-Rd|0}}a.random=Yb,a.random.seed=Wb,Object.defineProperty(Yb,"allowWeak",{get:function(){return Od},set:function(a){Od=a}}),Object.defineProperty(Yb,"skipSystemRNGWarning",{get:function(){return Pd},set:function(a){Pd=a}}),a.getRandomValues=Xb,a.getRandomValues.seed=Wb,Object.defineProperty(Xb,"allowWeak",{get:function(){return Od},set:function(a){Od=a}}),Object.defineProperty(Xb,"skipSystemRNGWarning",{get:function(){return Pd},set:function(a){Pd=a}}),b.Math.random=Yb,void 0===b.crypto&&(b.crypto={}),b.crypto.getRandomValues=Xb;var Sd;Sd=void 0===b.Math.imul?function(a,c,d){b.Math.imul=Zb;var e=$b(a,c,d);return delete b.Math.imul,e}:$b;var Td=new Uint32Array(1048576),$b=Sd(b,null,Td.buffer),Ud=new Uint32Array(0),Vd=ac.prototype=new Number;Vd.toString=bc,Vd.toBytes=cc,Vd.valueOf=dc,Vd.clamp=ec,Vd.slice=fc,Vd.negate=gc,Vd.compare=hc,Vd.add=ic,Vd.subtract=jc,Vd.multiply=kc,Vd.square=lc,Vd.divide=mc;var Wd=new ac(0),Xd=new ac(1);Object.freeze(Wd),Object.freeze(Xd);var Yd=pc.prototype=new ac;Yd.reduce=qc,Yd.inverse=rc,Yd.power=sc;var Zd=[2,3];Vd.isProbablePrime=vc,ac.randomProbablePrime=xc,ac.ZERO=Wd,ac.ONE=Xd,ac.extGCD=oc,a.BigNumber=ac,a.Modulus=pc;var $d=yc.prototype;$d.reset=zc,$d.encrypt=Ac,$d.decrypt=Bc,yc.generateKey=Cc;var _d=Dc.prototype;_d.reset=Ec,_d.encrypt=Fc,_d.decrypt=Gc;var ae=Ic.prototype;ae.reset=Jc,ae.sign=Kc,ae.verify=Lc,a.RSA={generateKey:Mc},a.RSA_OAEP_SHA1={encrypt:Nc,decrypt:Oc},a.RSA_OAEP_SHA256={encrypt:Pc,decrypt:Qc},a.RSA_PSS_SHA1={sign:Rc,verify:Sc},a.RSA_PSS_SHA256={sign:Tc,verify:Uc}}({},function(){return this}());

var bs3u = {
  version: {
    full: "2.0.12",
    major: "2",
    minor: "0",
    patch: "12"
  },
  constants: {
    FIFTEEN_MINUTES: 900000
  }
};

bs3u.Ajax = function(config) {
  this.config = config;
  this.xhr    = new XMLHttpRequest();
};

bs3u.Ajax.prototype.onError = function(callback) {
  callback = callback || function() {};
  this.xhr.addEventListener("error", callback, true);
};

bs3u.Ajax.prototype.onTimeout = function(callback) {
  callback = callback || function() {};
  this.xhr.addEventListener("timeout", callback, true);
};

bs3u.Ajax.prototype.onSuccess = function(callback) {
  callback = callback || function() {};
  this.xhr.addEventListener("load", callback, true);
};

bs3u.Ajax.prototype.onReadyStateChange = function(callback) {
  callback = callback || function() {};
  this.xhr.addEventListener("readystatechange", callback);
};

bs3u.Ajax.prototype.onProgress = function(callback) {
  callback = callback || function() {};
  this.xhr.upload.addEventListener("progress", callback);
};

bs3u.Ajax.prototype.setTimeout = function(timeout) {
  this.xhr.timeout = timeout;
};

bs3u.Ajax.prototype.buildURL = function(url, params) {
  if (params) {
    for (var name in params) {

      if (url.indexOf('?') !== -1) {
        url += "&";
      } else {
        url += "?";
      }

      url += encodeURIComponent(name) + "=";
      url += encodeURIComponent(params[name]);
    }
  }
  return url;
};

bs3u.Ajax.prototype.setHeaders = function(headers) {
  var ajax = this;
  ajax.headers = headers;
  for (var header in headers) {
    ajax.xhr.setRequestHeader(header, headers[header]);
  }
};

bs3u.Ajax.prototype.open = function() {
  var url = this.config.url;
  var method = this.config.method || "GET";
  var params = this.config.params || {};

  url = this.buildURL(url, params);

  this.url = url;
  this.method = method;
  
  this.xhr.open(method, url);
};

bs3u.Ajax.prototype.send = function(body) {
  var headers = this.config.headers || {};
  var timeout = this.config.timeout || bs3u.constants.FIFTEEN_MINUTES;

  this.open();
  this.setHeaders(headers);
  this.setTimeout(timeout);

  this.body = body;

  if (body) {
    this.xhr.send(body);
  } else {
    this.xhr.send();
 }
};

bs3u.Ajax.prototype.abort = function() {
  this.xhr.abort();
};

/*
* Copyright © 2014 Joel Andritsch <joel.andritsch@gmail.com>
* See LICENSE for copyright/licensing information.
*/

// Simple constructor. Accepts a file object and some settings.
bs3u.Uploader = function(file, settings) {
  var uploader = this;
  uploader.file = file;
  uploader._XHRs = [];
  uploader._chunkSignatureXHRs = {};
  uploader._chunkXHRs = {};
  uploader._chunkProgress = {};
  uploader._initHeaders = {};
  uploader._chunkHeaders = {};
  uploader._listHeaders = {};
  uploader._completeHeaders = {};
  uploader._configureUploader(settings);
  uploader._notifyUploaderReady();
  uploader._setReady();
};

// Configure the uploader using the provided settings or sensible defaults.
bs3u.Uploader.prototype._configureUploader = function(settings) {
  var uploader = this;

  uploader.settings = {};

  // The content type of the file
  uploader.settings.contentType             = settings.contentType || uploader.file.type;
  // Size of each part sent in the multipart request. AWS requires a chunk size of at least 5mb,
  // so it cannot be any lower than that.

  var minimumChunkSize = 1024 * 1024 * 6;
  var defaultChunkSize = 1024 * 1024 * 10;

  uploader.settings.chunkSize               = Math.max(settings.chunkSize || defaultChunkSize, minimumChunkSize);
  // If set to true, the upload will be performed using an AES256 encryption.
  uploader.settings.encrypted               = settings.encrypted || false;
  // Should any part of the upload process fail, it will automatically retry any AJAX call
  // as long as it's within the retry limit.
  uploader.settings.maxRetries              = settings.maxRetries || 5;
  // The maximum file size allowed for this upload. AWS currently does not support uploading files
  // larger than 5 terabytes.
  uploader.settings.maxFileSize             = settings.maxFileSize || 1024 * 1024 * 1024 * 1024 * 5; // 5TB
  // The ACL (Access Control List) policy. Valid options are as follows:
    // authenticated-read
    // bucket-owner-full-control
    // bucket-owner-read
    // log-delivery-write
    // private
    // public-read (default)
    // public-read-write
  uploader.settings.acl                     = settings.acl || "public-read";
  // The root path to your signature backend. If you plan on defining the necessary
  // routes at the root of your application, leave this blank.
  uploader.settings.signatureBackend        = settings.signatureBackend || "";
  // Where the init headers can be retrieved.
  uploader.settings.initHeadersPath         = settings.initHeadersPath || "/get_init_headers";
  // Where the chunk headers can be retrieved.
  uploader.settings.chunkHeadersPath        = settings.chunkHeadersPath || "/get_chunk_headers";
  // Where the list headers can be retrieved.
  uploader.settings.listHeadersPath         = settings.listHeadersPath || "/get_list_headers";
  // Where the complete headers can be retrieved.
  uploader.settings.completeHeadersPath     = settings.completeHeadersPath || "/get_complete_headers";
  // The name of your S3 bucket
  uploader.settings.bucket                  = settings.bucket || "your-bucket-name";
  // If not setting a host, set to true if uploading using ssl.
  uploader.settings.ssl                     = settings.ssl || false;
  if (uploader.settings.ssl) {
    uploader.settings.protocol = "https://";
  } else {
    uploader.settings.protocol = "http://";
  }
  // The region where your bucket is located. This is needed for signature generation.
  uploader.settings.region                  = settings.region || "your-region";

  // The host name is not required but can be explicitly set.
  uploader.settings.host                    = settings.host || uploader._defaultHost();
  // If true, you will see logging output in your browser's web inspector.
  uploader.settings.log                     = settings.log || false;
  // Any custom headers that need to be set. Note that these headers are only used for
  // communication with your own application and are not sent to AWS.
  uploader.settings.customHeaders           = settings.customHeaders || {};
  // The maximum number of concurrent XHR requests for a given upload. Increasing this
  // number may result in faster uploads, however browsers tend to have their own concurrent
  // XHR limitation built in. This means anything greater than that number will not have
  // any effect on upload performance. To handle this, we're setting a cap at 5
  // concurrent XHRs.
  uploader.settings.maxConcurrentChunks     = Math.max(Math.min((settings.maxConcurrentChunks || 5), 5), 1);
  // The number of milliseconds to wait before attempting another retry. Note that this number scales with the
  // number of attempts. For example, the first retry will wait for 2 seconds before attempting, whereaas the
  // 3rd retry will wait for 6 seconds. Formala: (waitTime * attempts).
  uploader.settings.retryWaitTime           = settings.retryWaitTime || 2000;
  // If the host is specified and the host is for a CloudFront distribution, set
  // this flag to true. The uploader has to do some things a bit differently when
  // uploading against CloudFront.
  uploader.settings.usingCloudFront         = settings.usingCloudFront || false;

  // Generates a default key to use for the upload if none was provided.
  var defaultKey = new Date().getTime() + "_" + uploader.file.name;
  // The key for this upload.
  uploader.settings.key = settings.key || defaultKey;

  // If set to true, any SHA256 encryption will be done through web workers. This
  // will greatly increase performance when requesting headers for each chunk
  // of the file.
  uploader.settings.useWebWorkers           = settings.useWebWorkers || false;

  // The following settings are not necessary unless you're using web workers:
  
  // The path where the the worker file is located.
  uploader.settings.workerFilePath          = settings.workerFilePath || "/basic_s3_worker.js";
  // The path where this file is located. This is needed because the worker imports this file.
  uploader.settings.uploaderFilePath        = settings.uploaderFilePath || "/basic_s3_uploader.js";

  // Events

  // Fires when the uploader has been initialized and ready to start uploading.
  uploader.settings.onReady         = settings.onReady || function() {};
  // Fires when the upload has started.
  uploader.settings.onStart         = settings.onStart || function() {};
  // Fires whenever upload progress is reported for any chunk.
  uploader.settings.onProgress      = settings.onProgress || function(loaded, total) {};
  // Fires whenever a single chunk has finished uploading.
  uploader.settings.onChunkUploaded = settings.onChunkUploaded || function(chunkNumber, totalChunks) {};
  // Fires whenever all chunks have finished uploading.
  uploader.settings.onComplete      = settings.onComplete || function(location) {};
  // Fires whenever an error is encountered.
  uploader.settings.onError         = settings.onError || function(errorCode, description) {};
  // Fires whenever a call is retried. Note that if multiple chunks are uploading at once and
  // they all fail, this will get called once for each chunk.
  uploader.settings.onRetry         = settings.onRetry || function(attempts, data) {};
  // Fires whenever an upload is cancelled.
  uploader.settings.onCancel        = settings.onCancel || function() {};
  // Fires whenever the uploader logs data. This will only be invoked if logging
  // is enabled.
  uploader.settings.onLog           = settings.onLog || function(message, object) {};

};

// Start the upload, but only if the file is deemed "readable".
bs3u.Uploader.prototype.startUpload = function() {
  var uploader = this;

  uploader._log("startUpload called");

  if (uploader._isUploading()) {
    uploader._log("Uploader is already running.");
    return;
  }

  if (uploader.file.size > uploader.settings.maxFileSize) {
    var errorCode = 0;
    uploader._notifyUploadError(errorCode, uploader.errors[errorCode], {});
    uploader._setFailed();
    uploader._log("Uploader error: ", uploader.errors[errorCode]);
    return;
  }

  uploader._validateFileIsReadable(function(valid) {
    if (valid) {
      uploader._createChunks();
      uploader._notifyUploadStarted();
      uploader._setUploading();
      uploader._getInitHeaders();
    } else {
      var errorCode = 1;
      uploader._notifyUploadError(errorCode, uploader.errors[errorCode], {});
      uploader._setFailed();
      uploader._log("Uploader error: ", uploader.errors[errorCode]);
    }
  });

};

// Cancels all XHR requests.
bs3u.Uploader.prototype.cancelUpload = function() {
  var uploader = this;
  var xhr;

  if (!uploader._isUploading()) {
    return;
  }

  uploader._log("Aborting upload");
  uploader._abortAllXHRs();
  uploader._notifyUploadCancelled();
  uploader._setCancelled();
};

// Stops all XHR requests
bs3u.Uploader.prototype._abortAllXHRs = function() {
  var uploader = this;

  uploader._log("Aborting all XHR requests");

  for (var index in uploader._XHRs) {
    uploader._XHRs[index].abort();
  }

  for (var chunk in uploader._chunkXHRs) {
    uploader._chunkXHRs[chunk].abort();
  }

  for (var chunkSignature in uploader._chunkSignatureXHRs) {
    uploader._chunkSignatureXHRs[chunkSignature].abort();
  }
};

// Slices up the file into chunks, storing the startRange and endRange of each chunk on the uploader
// so the blobs can be created when needed.
bs3u.Uploader.prototype._createChunks = function() {
  var uploader = this;
  var chunks = {};

  uploader._log("Slicing up file into chunks");

  var chunkSize = Math.min(uploader.settings.chunkSize, uploader.file.size);
  var totalChunks = Math.ceil(uploader.file.size / chunkSize);

  var remainingSize, startRange, endRange, sizeOfChunk;

  for(var partNumber = 1; partNumber < totalChunks + 1; partNumber++) {
    remainingSize = remainingSize || uploader.file.size;
    startRange = startRange || 0;
    sizeOfChunk = sizeOfChunk || chunkSize * partNumber;

    endRange = (startRange + sizeOfChunk);

    chunks[partNumber] = {
      startRange: startRange,
      endRange: endRange,
      uploading: false,
      uploadComplete: false,
      eTag: null
    };

    startRange = (chunkSize * partNumber);
    remainingSize = remainingSize - sizeOfChunk;

    if (remainingSize < sizeOfChunk) {
      sizeOfChunk = remainingSize;
    }
  }
  uploader._chunks = chunks;
  uploader._log("Total chunks to upload:", Object.keys(chunks).length);
};

// Call to the provided signature backend to get the init headers.
// The response should contain all necessary headers to authenticate the request.
bs3u.Uploader.prototype._getInitHeaders = function(retries) {
  var uploader = this;
  var attempts = retries || 0;

  uploader._log("Getting the init headers");

  var success = function(encrypted) {
    var ajax = new bs3u.Ajax({
      url: uploader.settings.signatureBackend + uploader.settings.initHeadersPath,
      method: "GET",
      params: {
        key: uploader.settings.key,
        content_type: uploader.settings.contentType,
        acl: uploader.settings.acl,
        encrypted: uploader.settings.encrypted,
        payload: encrypted,
        region: uploader.settings.region,
        host: uploader.settings.host,
      },
      headers: uploader.settings.customHeaders,
    });

    ajax.onSuccess(function(response) {
      uploader._getInitHeadersSuccess(attempts, response, ajax);
    });

    ajax.onError(function(response) {
      uploader._getInitHeadersError(attempts, response, ajax);
    });

    ajax.onTimeout(function(response) {
      uploader._getInitHeadersError(attempts, response, ajax);
    });

    ajax.send();
    uploader._XHRs.push(ajax);
  };

  var failure = function(error) {
    uploader._getInitHeadersError(attempts, error, {});
  };

  uploader._encryptText("", success, failure);

};

// The success callback for getting init headers
bs3u.Uploader.prototype._getInitHeadersSuccess = function(attempts, response, ajax) {
  var uploader = this;
  if (response.target.status == 200) {
    uploader._log("Init headers retrieved");
    uploader._initHeaders = JSON.parse(response.target.responseText);
    uploader._initiateUpload();
  } else {
    uploader._log("Server returned a non-200. Deferring to error handler!");
    uploader._getInitHeadersError(attempts, response, ajax);
  }
};

// The error callback for getting a init headers
bs3u.Uploader.prototype._getInitHeadersError = function(attempts, response, ajax) {
  var uploader = this;
  var data = uploader._formatErrorForAction('getInitHeaders', response, ajax);
  if (uploader._retryAvailable(attempts)) {
    attempts += 1;
    uploader._log("Attempting to retry retrieval of init headers.");
    setTimeout(function() {
      uploader._notifyUploadRetry(attempts, data);
      uploader._getInitHeaders(attempts);
    }, uploader._timeToWaitBeforeNextRetry(attempts));
  } else {
    var errorCode = 2;
    uploader._notifyUploadError(errorCode, uploader.errors[errorCode], data);
    uploader._setFailed();
    uploader._log("Uploader error!", uploader.errors[errorCode]);
  }
};

// Initiate a new upload to S3 using the init signature. This will return an UploadId
// when successful.
bs3u.Uploader.prototype._initiateUpload = function(retries) {
  var uploader = this;
  var attempts = retries || 0;

  uploader._log("Initiating the upload");

  var ajax = new bs3u.Ajax({
    url: uploader.settings.host + "/" + uploader.settings.key + "?uploads",
    method: "POST",
    headers: uploader._initHeaders
  });

  ajax.onSuccess(function(response) {
    uploader._initiateUploadSuccess(attempts, response, ajax);
  });

  ajax.onError(function(response) {
    uploader._initiateUploadError(attempts, response, ajax);
  });

  ajax.onTimeout(function(response) {
    uploader._initiateUploadError(attempts, response, ajax);
  });

  ajax.send();
  uploader._XHRs.push(ajax);
};

// The success callback for initiating an upload
bs3u.Uploader.prototype._initiateUploadSuccess = function(attempts, response, ajax) {
  var uploader = this;
  if (response.target.status == 200) {
    uploader._log("Upload initiated.");
    var xml = response.target.responseXML;
    uploader._uploadId = xml.getElementsByTagName('UploadId')[0].textContent;
    uploader._startCompleteWatcher();
    uploader._startBandwidthMonitor();
  } else {
    uploader._log("Initiate upload error. Deferring to error handler.");
    uploader._initiateUploadError(attempts, response, ajax);
  }
};

// The error callback for initiating an upload
bs3u.Uploader.prototype._initiateUploadError = function(attempts, response, ajax) {
  var uploader = this;
  var data = uploader._formatErrorForAction('initiateUpload', response, ajax);
  if (uploader._retryAvailable(attempts)) {
    attempts += 1;
    uploader._log("Retrying to initiate the upload.");
    setTimeout(function() {
      uploader._notifyUploadRetry(attempts, data);
      uploader._getInitHeaders(attempts);
    }, uploader._timeToWaitBeforeNextRetry(attempts));
  } else {
    var errorCode = 3;
    uploader._notifyUploadError(errorCode, uploader.errors[errorCode], data);
    uploader._setFailed();
    uploader._log("Uploader error!", uploader.errors[errorCode]);
  }
};

// Iterate over all chunks and start all uploads simultaneously
bs3u.Uploader.prototype._uploadChunks = function() {
  var uploader = this;
  var totalChunks = Object.keys(uploader._chunks).length;

  for(var chunkNumber = 1; chunkNumber < totalChunks + 1; chunkNumber++) {
    var chunk = uploader._chunks[chunkNumber];
    if (!chunk.uploading && !chunk.uploadComplete && uploader._uploadSpotAvailable()) {
      chunk.uploading = true;
      chunk.uploadComplete = false;
      uploader._getChunkHeaders(chunkNumber);
    }
  }
};

// Call to the provided signature backend to get the chunk headers.
// The response should contain all necessary headers to authenticate the request.
bs3u.Uploader.prototype._getChunkHeaders = function(number, retries) {
  var uploader = this;
  var attempts = retries || 0;
  var chunk = uploader._chunks[number];

  uploader._log("Getting chunk " + number + " headers");

  var body = uploader.file.slice(chunk.startRange, chunk.endRange);
  var fileReader = new FileReader();

  fileReader.onloadend = function() {

    var success = function(encrypted) {

      // IMPORTANT! Forgetting to do this will result in the FileReader remaining
      // in memory with the entire contents of the file/data read.
      fileReader = undefined;

      if (!chunk.uploading) { return; }

      var ajax = new bs3u.Ajax({
        url: uploader.settings.signatureBackend + uploader.settings.chunkHeadersPath,
        method: "GET",
        params: {
          key: uploader.settings.key,
          content_type: uploader.settings.contentType,
          payload: encrypted,
          part_number: number,
          upload_id: uploader._uploadId,
          region: uploader.settings.region,
          host: uploader.settings.host,
        },
        headers: uploader.settings.customHeaders,
      });

      ajax.onSuccess(function(response) {
        uploader._getChunkHeadersSuccess(attempts, number, response, ajax);
      });

      ajax.onError(function(response) {
        uploader._getChunkHeadersError(attempts, number, response, ajax);
      });

      ajax.onTimeout(function(response) {
        uploader._getChunkHeadersError(attempts, number, response, ajax);
      });

      ajax.send();
      uploader._chunkSignatureXHRs[number] = ajax;
    };

    var failure = function(error) {
      uploader._getChunkHeadersError(attempts, number, error, {});
    };

    uploader._encryptText(fileReader.result, success, failure);

  };

  fileReader.readAsArrayBuffer(body);
};

bs3u.Uploader.prototype._getChunkHeadersSuccess = function(attempts, number, response, ajax) {
  var uploader = this;
  if (response.target.status == 200) {
    uploader._log("Chunk " + number + " headers retrieved");
    uploader._chunkHeaders[number] = JSON.parse(response.target.responseText);
    uploader._uploadChunk(number, attempts);
  } else {
    uploader._log("Server returned a non-200. Deferring to error handler!");
    uploader._getChunkHeadersError(attempts, number, response, ajax);
  }
};

bs3u.Uploader.prototype._getChunkHeadersError = function(attempts, number, response, ajax) {
  var uploader = this;
  var data = uploader._formatErrorForAction('getChunkHeaders', response, ajax);
  if (uploader._retryAvailable(attempts)) {
    attempts += 1;
    uploader._log("Attempting to retry retrieval of chunk " + number + " headers.");
    setTimeout(function() {
      uploader._notifyUploadRetry(attempts, data);
      uploader._getChunkHeaders(number, attempts);
    }, uploader._timeToWaitBeforeNextRetry(attempts));
  } else {
    var errorCode = 4;
    uploader._notifyUploadError(errorCode, uploader.errors[errorCode], data);
    uploader._setFailed();
    uploader._log("Uploader error!", uploader.errors[errorCode]);
  }
};

// This checks to see which chunks are uploading and returns true if there is room
// for another chunk upload.
bs3u.Uploader.prototype._uploadSpotAvailable = function() {
  var uploader = this;
  return uploader._chunkUploadsInProgress() < uploader.settings.maxConcurrentChunks;
};

// Uploads a single chunk to S3. Because multiple chunks can be uploading at
// the same time, the "success" callback for this request checks to see if all
// chunks have been uploaded. If they have, the uploader will try to complete
// the upload.
bs3u.Uploader.prototype._uploadChunk = function(number, retries) {
  var uploader = this;
  var attempts = retries || 0;

  var chunk = uploader._chunks[number];

  if (!chunk.uploading) { return; }

  var body = uploader.file.slice(chunk.startRange, chunk.endRange);

  uploader._log("Starting the XHR upload for chunk " + number);

  var ajax = new bs3u.Ajax({
    url: uploader.settings.host + "/" + uploader.settings.key,
    method: "PUT",
    params: {
      uploadId: uploader._uploadId,
      partNumber: number,
    },
    headers: uploader._chunkHeaders[number]
  });

  ajax.onProgress(function(response) {
    uploader._uploadChunkProgress(response, number);
  });

  ajax.onSuccess(function(response) {
    //Very important, keeps body from getting destroyed early and sending 0 bytes to AWS
    //See here for why https://code.google.com/p/chromium/issues/detail?id=167111
    uploader._log("Superfluous logging of body size to keep body from getting GCed", body.size);
    body = undefined;

    uploader._uploadChunkSuccess(attempts, response, number, ajax);
  });

  ajax.onError(function(response) {
    uploader._uploadChunkError(attempts, response, number, ajax);
  });

  ajax.onTimeout(function(response) {
    uploader._uploadChunkError(attempts, response, number, ajax);
  });

  ajax.send(body);
  uploader._chunkXHRs[number] = ajax;
};

// The progress callback for a single chunk
bs3u.Uploader.prototype._uploadChunkProgress = function(response, number) {
  var uploader = this;
  uploader._chunkProgress[number] = response.loaded;
  uploader._chunkXHRs[number].lastProgressAt = new Date().getTime();
  uploader._notifyUploadProgress();
};

// The success callback for uploading a single chunk
bs3u.Uploader.prototype._uploadChunkSuccess = function(attempts, response, number, ajax) {
  var uploader = this;
  var chunk = uploader._chunks[number];
  if (response.target.status == 200) {
    var totalChunks = Object.keys(uploader._chunks).length;
    chunk.uploading = false;
    chunk.uploadComplete = true;
    uploader._log("Chunk " + number +  " has finished uploading");
    uploader._notifyChunkUploaded(number, totalChunks);
    // Store the eTag on the chunk
    var eTag = response.target.getResponseHeader("ETag");
    if (eTag && eTag.length > 0) {
      chunk.eTag = eTag;
    } else {
      uploader._log("Upload of chunk " + number +  " has failed. The eTag was blank!");
      uploader._uploadChunkError(attempts, response, number, ajax);
    }
  } else {
    uploader._log("Upload of chunk " + number +  " has failed. Deferring to error handler");
    uploader._uploadChunkError(attempts, response, number, ajax);
  }
};

// The error callback for uploading a single chunk
bs3u.Uploader.prototype._uploadChunkError = function(attempts, response, number, ajax) {
  var uploader = this;

  uploader._log("XHR error for chunk " + number, response);
  var chunk = uploader._chunks[number];

  var data = uploader._formatErrorForAction('uploadChunk', response, ajax);
  data.chunkNumber = number;
  data.chunk = chunk;

  if (uploader._retryAvailable(attempts)) {
    attempts += 1;
    uploader._log("Retrying to upload chunk " + number);
    setTimeout(function() {
      uploader._notifyUploadRetry(attempts, data);
      uploader._getChunkHeaders(number, attempts);
    }, uploader._timeToWaitBeforeNextRetry(attempts));
  } else {
    var errorCode = 7;
    uploader._notifyUploadError(errorCode, uploader.errors[errorCode], data);
    uploader._setFailed();
    uploader._log("Uploader error! Cannot retry chunk " + number, uploader.errors[errorCode]);
  }
};

// Call to the provided signature backend to get the list headers.
// The response should contain all necessary headers to authenticate the request.
bs3u.Uploader.prototype._getListHeaders = function(retries) {
  var uploader = this;
  var attempts = retries || 0;

  uploader._log("Getting the list headers");

  var success = function(encrypted) {
    var ajax = new bs3u.Ajax({
      url: uploader.settings.signatureBackend + uploader.settings.listHeadersPath,
      method: "GET",
      params: {
        key: uploader.settings.key,
        content_type: uploader.settings.contentType,
        payload: encrypted,
        region: uploader.settings.region,
        upload_id: uploader._uploadId,
        host: uploader.settings.host,
      },
      headers: uploader.settings.customHeaders,
    });

    ajax.onSuccess(function(response) {
      uploader._getListHeadersSuccess(attempts, response, ajax);
    });

    ajax.onError(function(response) {
      uploader._getListHeadersError(attempts, response, ajax);
    });

    ajax.onTimeout(function(response) {
      uploader._getListHeadersError(attempts, response, ajax);
    });

    ajax.send();
    uploader._XHRs.push(ajax);
  };

  var failure = function(error) {
    uploader._getListHeadersError(attempts, error, {});
  };

  uploader._encryptText("", success, failure);

};

bs3u.Uploader.prototype._getListHeadersSuccess = function(attempts, response, ajax) {
  var uploader = this;
  if (response.target.status == 200) {
    uploader._log("list headers retrieved");
    uploader._listHeaders = JSON.parse(response.target.responseText);
    uploader._verifyAllChunksUploaded();
  } else {
    uploader._log("Server returned a non-200. Deferring to error handler!");
    uploader._getListHeadersError(attempts, response, ajax);
  }
};

bs3u.Uploader.prototype._getListHeadersError = function(attempts, response, ajax) {
  var uploader = this;
  var data = uploader._formatErrorForAction('getListHeaders', response, ajax);

  if (uploader._retryAvailable(attempts)) {
    attempts += 1;
    uploader._log("Attempting to retry retrieval of list headers.");
    setTimeout(function() {
      uploader._notifyUploadRetry(attempts, data);
      uploader._getListHeaders(attempts);
    }, uploader._timeToWaitBeforeNextRetry(attempts));
  } else {
    var errorCode = 9;
    uploader._notifyUploadError(errorCode, uploader.errors[errorCode], data);
    uploader._setFailed();
    uploader._log("Uploader error!", uploader.errors[errorCode]);
  }
};

// Calls the S3 "List chunks" API and compares the result to the chunks the uploader
// sent. If any chunk is invalid (missing eTag, invalid size, different number of chunks)
// then the uploader attempts to re-upload that chunk.
bs3u.Uploader.prototype._verifyAllChunksUploaded = function(retries) {
  var uploader = this;
  var attempts = retries || 0;

  uploader._log("Verifying all chunks have been uploaded");

  // CloudFront does not support the List Parts method, so we must go directly
  // to the bucket in order to verify everything was uploaded correctly.
  var host;
  if (uploader.settings.usingCloudFront) {
    host = uploader._defaultHost();
  } else {
    host = uploader.settings.host;
  }

  var ajax = new bs3u.Ajax({
    url: host + "/" + uploader.settings.key,
    method: "GET",
    params: {
      uploadId: uploader._uploadId,
    },
    headers: uploader._listHeaders
  });

  ajax.onSuccess(function(response) {
    uploader._verifyAllChunksUploadedSuccess(attempts, response, ajax);
  });

  ajax.onError(function(response) {
    uploader._verifyAllChunksUploadedError(attempts, response, ajax);
  });

  ajax.onTimeout(function(response) {
    uploader._verifyAllChunksUploadedError(attempts, response, ajax);
  });

  ajax.send();
  uploader._XHRs.push(ajax);
};

bs3u.Uploader.prototype._collectInvalidChunks = function(parts) {
  var uploader = this;
  var invalidParts = [];

  for (var i = 0; i < parts.length; i++) {
    var part = parts[i];

    var number = parseInt(part.getElementsByTagName("PartNumber")[0].textContent, 10);
    var eTag = part.getElementsByTagName("ETag")[0].textContent;
    var size = parseInt(part.getElementsByTagName("Size")[0].textContent, 10);

    var uploadedChunk = uploader._chunks[number];
    var expectedSize = uploadedChunk.endRange - uploadedChunk.startRange;

    if (!uploadedChunk || eTag != uploadedChunk.eTag || size != expectedSize) {
      uploader._log('About to add chunk ' + number + ' to the invalidParts.');
      invalidParts.push(number);
      // ensure that uploadComplete has the correct value (see _uploadChunks)
      uploadedChunk.uploadComplete = false;
      // invalidate the eTag to prevent extraneous calls to _verifyAllChunksUploaded
      uploadedChunk.eTag = null;
    }
  }

  return invalidParts;
};

bs3u.Uploader.prototype._verifyAllChunksUploadedSuccess = function(attempts, response, ajax) {
  var uploader = this;

  if (response.target.status == 200) {
    var xml = response.target.responseXML;
    var parts = xml.getElementsByTagName("Part");
    var totalParts = Object.keys(uploader._chunks).length;

    var invalidParts = uploader._collectInvalidChunks(parts);

    if (totalParts != parts.length) {
      uploader._log("Some chunks are missing. Attempting to re-upload them.");
      uploader._handleMissingChunks(parts);
    } else if (invalidParts.length > 0) {
      uploader._log("Some chunks are invalid. Attempting to re-upload them.");
      uploader._handleInvalidChunks(invalidParts);
    } else {
      uploader._log("All chunks have been uploaded");
      uploader._getCompleteHeaders();
    }

  } else {
    uploader._log("Chunk verification has failed. Deferring to error handler");
    uploader._verifyAllChunksUploadedError(attempts, response, ajax);
  }
};

// Call to the provided signature backend to get the complete headers.
// The response should contain all necessary headers to authenticate the request.
bs3u.Uploader.prototype._getCompleteHeaders = function(retries) {
  var uploader = this;
  var attempts = retries || 0;

  uploader._log("Getting the complete headers");

  var payload = uploader._generateCompletePayload();

  var success = function(encrypted) {
    var ajax = new bs3u.Ajax({
      url: uploader.settings.signatureBackend + uploader.settings.completeHeadersPath,
      method: "GET",
      params: {
        key: uploader.settings.key,
        content_type: uploader.settings.contentType,
        payload: encrypted,
        region: uploader.settings.region,
        upload_id: uploader._uploadId,
        host: uploader.settings.host,
      },
      headers: uploader.settings.customHeaders,
    });

    ajax.onSuccess(function(response) {
      uploader._getCompleteHeadersSuccess(attempts, response, ajax);
    });

    ajax.onError(function(response) {
      uploader._getCompleteHeadersError(attempts, response, ajax);
    });

    ajax.onTimeout(function(response) {
      uploader._getCompleteHeadersError(attempts, response, ajax);
    });

    ajax.send();
    uploader._XHRs.push(ajax);
  };

  var failure = function(error) {
    uploader._getCompleteHeadersError(attempts, error, {});
  };

  uploader._encryptText(payload, success, failure);
};

bs3u.Uploader.prototype._getCompleteHeadersSuccess = function(attempts, response, ajax) {
  var uploader = this;
  if (response.target.status == 200) {
    uploader._log("complete headers retrieved");
    uploader._completeHeaders = JSON.parse(response.target.responseText);
    uploader._completeUpload();
  } else {
    uploader._log("Server returned a non-200. Deferring to error handler!");
    uploader._getCompleteHeadersError(attempts, response, ajax);
  }
};

bs3u.Uploader.prototype._getCompleteHeadersError = function(attempts, response, ajax) {
  var uploader = this;
  var data = uploader._formatErrorForAction('getCompleteHeaders', response, ajax);

  if (uploader._retryAvailable(attempts)) {
    attempts += 1;
    uploader._log("Attempting to retry retrieval of complete headers.");
    setTimeout(function() {
      uploader._notifyUploadRetry(attempts, data);
      uploader._getCompleteHeaders(attempts);
    }, uploader._timeToWaitBeforeNextRetry(attempts));
  } else {
    var errorCode = 10;
    uploader._notifyUploadError(errorCode, uploader.errors[errorCode], data);
    uploader._setFailed();
    uploader._log("Uploader error!", uploader.errors[errorCode]);
  }
};

bs3u.Uploader.prototype._verifyAllChunksUploadedError = function(attempts, response, ajax) {
  var uploader = this;
  var data = uploader._formatErrorForAction('verifyAllChunksUploaded', response, ajax);

  if (uploader._retryAvailable(attempts)) {
    attempts += 1;
    uploader._log("Retrying chunk verification");
    setTimeout(function() {
      uploader._notifyUploadRetry(attempts, data);
      uploader._getListHeaders(attempts);
    }, uploader._timeToWaitBeforeNextRetry(attempts));
  } else {
    var errorCode = 6;
    uploader._notifyUploadError(errorCode, uploader.errors[errorCode], data);
    uploader._setFailed();
    uploader._log("Uploader error!", uploader.errors[errorCode]);
  }
};

// Iterates over the list of invalid chunks flags them for re upload
bs3u.Uploader.prototype._handleInvalidChunks = function(invalidParts) {
  var uploader = this;

  var chunkNumber;
  for (var index in invalidParts) {
    chunkNumber = invalidParts[index];
    uploader._chunks[chunkNumber].uploading = false;
    uploader._chunks[chunkNumber].uploadComplete = false;
  }
  // Re-enable the completeWatcher so it can pick up the failed chunks and retry
  // them.
  uploader._pauseCompleteWatcher = false;
};

// Determines if S3 is missing any chunks that were sent, then flags them for
// a retry
bs3u.Uploader.prototype._handleMissingChunks = function(chunksFromS3) {
  var uploader = this;
  var chunkNumbersFromS3 = [];

  // The part numbers that S3 reported
  for (var i = 0; i < chunksFromS3.length; i++) {
    var chunk = chunksFromS3[i];
    chunkNumbersFromS3.push(chunk.getElementsByTagName("PartNumber")[0].textContent);
  }

  // Mark the missing parts as not uploaded so they will automatically retry
  for (var chunkNumber in uploader._chunks) {
    if (chunkNumbersFromS3.indexOf(chunkNumber) == -1) {
      uploader._chunks[chunkNumber].uploading = false;
      uploader._chunks[chunkNumber].uploadComplete = false;
    }
  }
  // Re-enable the completeWatcher so it can pick up the failed chunks and retry
  // them.
  uploader._pauseCompleteWatcher = false;
};

bs3u.Uploader.prototype._generateCompletePayload = function() {
  var uploader = this;

  var body = "<CompleteMultipartUpload>";
  var totalChunks = Object.keys(uploader._chunks);
  var chunkNumber;
  // Order is important here, so iterating "the old fashioned way" to make sure
  // we maintain ascending order for this payload.
  for (var i = 0; i < totalChunks.length; i++) {
    chunkNumber = i + 1;
    body += "<Part>";
    body += "<PartNumber>" + chunkNumber + "</PartNumber>";
    body += "<ETag>" + uploader._chunks[chunkNumber].eTag + "</ETag>";
    body += "</Part>";
  }
  body += "</CompleteMultipartUpload>";
  return body;
};

// Completes the multipart upload, effectively assembling all chunks together
// into one file.
bs3u.Uploader.prototype._completeUpload = function(retries) {
  var uploader = this;
  var attempts = retries || 0;

  uploader._log("About to complete the upload");

  var body = uploader._generateCompletePayload();

  var ajax = new bs3u.Ajax({
    url: uploader.settings.host + "/" + uploader.settings.key,
    method: "POST",
    params: {
      uploadId: uploader._uploadId
    },
    headers: uploader._completeHeaders
  });

  ajax.onSuccess(function(response) {
    uploader._completeUploadSuccess(attempts, response, ajax);
  });

  ajax.onError(function(response) {
    uploader._completeUploadError(attempts, response, ajax);
  });

  ajax.onTimeout(function(response) {
    uploader._completeUploadError(attempts, response, ajax);
  });

  ajax.send(body);
  uploader._XHRs.push(ajax);
};

bs3u.Uploader.prototype._completeUploadSuccess = function(attempts, response, ajax) {
  var uploader = this;
  if (response.target.status == 200) {
    var xml = response.target.responseXML;
    var location = xml.getElementsByTagName('Location')[0].textContent;
    if (location) {
      uploader._log("The upload has completed!");
      uploader._notifyUploadComplete(location);
      uploader._setComplete();
      uploader._abortAllXHRs();
    }
  } else {
    uploader._log("Unable to complete the uploader. Deferring to error handler");
    uploader._completeUploadError(attempts, response, ajax);
  }
};

bs3u.Uploader.prototype._completeUploadError = function(attempts, response, ajax) {
  var uploader = this;
  var data = uploader._formatErrorForAction('completeUpload', response, ajax);

  if (uploader._retryAvailable(attempts)) {
    attempts += 1;
    uploader._log("Attempting to retry upload completion");
    setTimeout(function() {
      uploader._notifyUploadRetry(attempts, data);
      uploader._getCompleteHeaders(attempts);
    }, uploader._timeToWaitBeforeNextRetry(attempts));
  } else {
    var errorCode = 8;
    uploader._notifyUploadError(errorCode, uploader.errors[errorCode], data);
    uploader._setFailed();
    uploader._log("Uploader error!", uploader.errors[errorCode]);
  }
};

// Returns true if attemts is less than maxRetries. Note that the first attempt
// (a non-retry attempt) is not counted.
bs3u.Uploader.prototype._retryAvailable = function(attempts) {
  var uploader = this;
  if (uploader._isCancelled() || uploader._isFailed()) {
    return false;
  }
  return (attempts + 1) < uploader.settings.maxRetries + 1;
};

// Returns true if we have an eTag for every chunk
bs3u.Uploader.prototype._allETagsAvailable = function() {
  var uploader = this;
  for (var chunkNumber in uploader._chunks) {
    var chunk = uploader._chunks[chunkNumber];
    if (chunk.eTag === null || chunk.eTag === undefined || chunk.eTag.length < 1) {
      return false;
    }
  }
  return true;
};

// Returns the number of chunk uploads currently in progress
bs3u.Uploader.prototype._chunkUploadsInProgress = function() {
  var uploader = this;
  var count = 0;
  var chunk;

  for (var chunkNumber in uploader._chunks) {
    chunk = uploader._chunks[chunkNumber];
    if (chunk.uploading === true) {
      count += 1;
    }
  }

  return count;
};

// Monitors chunk uploads and attempts to complete the upload
bs3u.Uploader.prototype._startCompleteWatcher = function() {
  var uploader = this;
  uploader._log("Starting the complete watcher interval");

  var id = setInterval(function() {
    if (!uploader._isUploading()) {
      uploader._log("Stopping the complete watcher interval");
      clearInterval(id);
      return;
    }

    if (uploader._pauseCompleteWatcher) {
      return;
    }

    if (uploader._allETagsAvailable()) {
      // temporarily shut down the watcher
      uploader._pauseCompleteWatcher = true;
      // get the list headers to verify the chunks are on the server
      uploader._getListHeaders();
    } else {
      // Continue uploading the remaining chunks
      uploader._uploadChunks();
    }

  }, 1000);
};

// This method will monitor the speed of the upload and reconfigure the number
// of concurrent uploads allowed. If the connection is attempting to upload more
// concurrent chunks than it can support, the number will scale down. If the uploader
// is under-utilizing the connection, the cap will increase and more concurrent
// chunks will be added from the "complete watcher".
bs3u.Uploader.prototype._startBandwidthMonitor = function() {
  var uploader = this;
  uploader._log("Starting bandwidth monitor");
  var initialMaxChunks = uploader.settings.maxConcurrentChunks;
  var monitorStartTime = new Date().getTime();
  var newConcurrentChunks;

  // calculate the number of possible concurrent chunks based on upload speed.
  var id = setInterval(function(){
    if (!uploader._isUploading()) {
      uploader._log("Stopping the bandwidth monitor");
      clearInterval(id);
      return;
    }

    newConcurrentChunks = uploader._calculateOptimalConcurrentChunks(monitorStartTime, initialMaxChunks);
    uploader._log("Optimal concurrent chunks for connection is ", newConcurrentChunks);
    uploader._log("Number of concurrent uploads in progress is ", uploader._chunkUploadsInProgress());
    uploader.settings.maxConcurrentChunks = newConcurrentChunks;

    if (newConcurrentChunks < uploader._chunkUploadsInProgress()) {
      uploader._log("There are more concurrent uploads than your connection can support. Stopping some XHRs.");
      for (var number in uploader._chunks) {
        if (uploader._chunkUploadsInProgress() > newConcurrentChunks) {
          uploader._abortChunkUpload(number);
        }
      }
    }

  }, 10000);
};

bs3u.Uploader.prototype._calculateOptimalConcurrentChunks = function(time, initialMaxChunks) {
  var uploader = this;
  var loaded = uploader._calculateUploadProgress();
  var speed = parseInt(loaded / (new Date().getTime() - time), 10);
  uploader._log("Calculated average upload speed is " + speed + " KB/s");
  var chunkSize = uploader.settings.chunkSize;
  // Needed speed to upload a single chunk within the signature timeout
  var neededSpeed = (chunkSize / bs3u.constants.FIFTEEN_MINUTES);
  var count = parseInt((speed / neededSpeed), 10);

  return Math.max(Math.min(count, initialMaxChunks), 1);
};

bs3u.Uploader.prototype._abortChunkUpload = function(number) {
  var uploader = this;
  var chunkXHR = uploader._chunkXHRs[number];
  var signatureXHR = uploader._chunkSignatureXHRs[number];
  var chunk = uploader._chunks[number];

  uploader._log("Cancelling the upload for chunk ", number);
  // Stop the chunk XHR if it exists
  if (chunkXHR) {
    chunkXHR.abort();
    chunkXHR.lastProgressAt = null;
  }

  // Stop the XHR to fetch a chunk signature if it exists
  if (signatureXHR) { signatureXHR.abort(); }

  // Flag the chunk as not uploading
  chunk.uploading = false;
  chunk.uploadComplete = false;
};

bs3u.Uploader.prototype._timeToWaitBeforeNextRetry = function(attempts) {
  var uploader = this;
  return uploader.settings.retryWaitTime * attempts;
};

bs3u.Uploader.prototype._calculateUploadProgress = function() {
  var uploader = this;
  var loaded = 0;
  for (var chunkNumber in uploader._chunkProgress) {
    loaded += uploader._chunkProgress[chunkNumber];
  }
  return loaded;
};

// State-related methods
bs3u.Uploader.prototype._setReady = function() {
  var uploader = this;
  uploader._status = "ready";
};

bs3u.Uploader.prototype._isReady = function() {
  var uploader = this;
  return uploader._status == "ready";
};

bs3u.Uploader.prototype._setUploading = function() {
  var uploader = this;
  uploader._status = "uploading";
};

bs3u.Uploader.prototype._isUploading = function() {
  var uploader = this;
  return uploader._status == "uploading";
};

bs3u.Uploader.prototype._setComplete = function() {
  var uploader = this;
  uploader._status = "complete";
};

bs3u.Uploader.prototype._isComplete = function() {
  var uploader = this;
  return uploader._status == "complete";
};

bs3u.Uploader.prototype._setCancelled = function() {
  var uploader = this;
  uploader._status = "cancelled";
};

bs3u.Uploader.prototype._isCancelled = function() {
  var uploader = this;
  return uploader._status == "cancelled";
};

bs3u.Uploader.prototype._setFailed = function() {
  var uploader = this;
  uploader._status = "failed";
  // stop any outstanding XHR requests
  uploader._abortAllXHRs();
};

bs3u.Uploader.prototype._isFailed = function() {
  var uploader = this;
  return uploader._status == "failed";
};

// Notification that the uploader is initialized. Calls the user-defined "onReady"
// method.
bs3u.Uploader.prototype._notifyUploaderReady = function() {
  var uploader = this;
  uploader.settings.onReady.call(uploader);
};

// Notification that the uploader has started uploading chunks. Calls the user-defined
// onStart method.
bs3u.Uploader.prototype._notifyUploadStarted = function() {
  var uploader = this;
  uploader.settings.onStart.call(uploader);
};

// Notification for upload progress. Iterates over the chunkProgresses and tallies
// up the bytes loaded. Calls the user-defined onProgress method, sending in the
// total loaded and the total file size remaining. From this data, overall upload
// progress can be determined.
bs3u.Uploader.prototype._notifyUploadProgress = function() {
  var uploader = this;

  var loaded = uploader._calculateUploadProgress();
  var total = uploader.file.size;
  uploader.settings.onProgress.call(uploader, loaded, total);
};

// Notifies when a chunk has finished uploading and calls the user-defined
// onChunkUploaded method.
bs3u.Uploader.prototype._notifyChunkUploaded = function(chunkNumber, totalChunks) {
  var uploader = this;
  uploader.settings.onChunkUploaded.call(uploader, chunkNumber, totalChunks);
};

// Notifies when the upload has finished and the parts have been assembled. Calls
// the user-defined onComplete method.
bs3u.Uploader.prototype._notifyUploadComplete = function(location) {
  var uploader = this;
  uploader.settings.onComplete.call(uploader, location);
};

// Notifies that an error has occurred with the uploader. Calls the user-defined
// onError method, sending in the error code and description
bs3u.Uploader.prototype._notifyUploadError = function(errorCode, description, data) {
  var uploader = this;
  // If the uploader has already been set to failed, this message has already been
  // sent so we will want to prevent duplicate publishes of this event.
  if (!uploader._isFailed()) {
    uploader.settings.onError.call(uploader, errorCode, description, data);
  }
};

// Notifies that a retry is being attempted. Calls the user-defined onRetry
// method, sending the attempt number.
bs3u.Uploader.prototype._notifyUploadRetry = function(attempt, data) {
  var uploader = this;
  uploader.settings.onRetry.call(uploader, attempt, data);
};

// Notifies that the upload has been cancelled. Calls the user-defined onCancel
// method.
bs3u.Uploader.prototype._notifyUploadCancelled = function() {
  var uploader = this;
  uploader.settings.onCancel.call(uploader);
};

// Using the FileReader API, this method attempts to open the file and read the
// first few bytes. This method accepts a callback and then calls it with the result
// of the check.
bs3u.Uploader.prototype._validateFileIsReadable = function(callback) {
  var uploader = this;
  var file = uploader.file;
  var blob = file.slice(0, 1024);
  var fr = new FileReader();

  fr.onloadend = function() {
    if (fr.error) {
      callback(false);
    } else {
      callback(true);
    }
    fr = undefined;
  };

  try {
    fr.readAsArrayBuffer(blob);
  } catch(error) {
    callback(false);
  }
};

// Encrypts the provided text, either with the help from web workers or not,
// and then executes the provided callback with the encrypted text.
bs3u.Uploader.prototype._encryptText = function(value, success, error) {
  var uploader = this;
  if (uploader.settings.useWebWorkers) {
    var worker = new Worker(uploader.settings.workerFilePath);
    worker.onmessage = function(e) {
      success(e.data);
    };
    worker.onerror = function(e) {
      uploader._log("Worker error: ", e);
      error({ target: { status: 500, responseText: "There was a Worker error: " + e.message} });
    };
    worker.postMessage({
      text: value,
      uploaderFilePath: uploader.settings.uploaderFilePath
    });
  } else {
    success(uploader._sha256(value));
  }
};

bs3u.Uploader.prototype._sha256 = function(value) {
  return asmCrypto.SHA256.hex(value);
};

bs3u.Uploader.prototype._defaultHost = function() {
  var uploader = this;
  return uploader.settings.protocol + uploader.settings.bucket + "." + "s3-" + uploader.settings.region + ".amazonaws.com";
};

bs3u.Uploader.prototype._formatErrorForAction = function(action, response, ajax) {
  return {
    action: action,
    requestInfo: {
      headers: ajax.headers,
      url: ajax.url,
      method: ajax.method,
      body: ajax.body
    },
    responseInfo: {
      status: response.target.status,
      responseText: response.target.responseText,
    }
  };
};

bs3u.Uploader.prototype._log = function(msg, object) {
  if (!this.settings.log) { return; }
  msg = "[BasicS3Uploader] " + msg;
  this.settings.onLog(msg, object);

  if (console && console.debug) {
    if (object !== undefined) {
      console.debug(msg, object);
    } else {
      console.debug(msg);
    }
  }
};

bs3u.Uploader.prototype.errors = {
  // code: description
  0: "The file could not be uploaded because it exceeds the maximum file size allowed.",
  1: "The file could not be uploaded because it cannot be read",
  2: "Max number of retries have been met. Unable to get init headers!",
  3: "Max number of retries have been met. Unable to initiate an upload request!",
  4: "Max number of retries have been met. Unable to get chunk headers!",
  5: "Max number of retries have been met. Upload of chunk has failed!",
  6: "Max number of retries have been met. Unable to verify all chunks have uploaded!",
  7: "Max number of retries has been met. Cannot retry uploading chunk!",
  8: "Max number of retries have been met. Unable to complete multipart upload!",
  9: "Max number of retries have been met. Unable to get list headers!",
  10: "Max number of retries have been met. Unable to get complete headers!"
};

// For backwards compatibility
var BasicS3Uploader = bs3u.Uploader;
