var win=window;
var GFWindowObserver=window.GFWindowObserver=function(a){
	this.swfID=a;
	this.isActive=true;
	this.bodyFocus=true;
    this.swfOutside = true;
};

GFWindowObserver.prototype={
	_onBlur:function(){
		GFWindowObserver.isActive=false;
		swfName(GFWindowObserver.swfID).getStatus(GFWindowObserver.isActive );
	},
	_onFocus:function(){
		GFWindowObserver.isActive=true;
		if(isIE){
			GFWindowObserver.bodyFocus=true;
			swfName(GFWindowObserver.swfID).changeStatus(GFWindowObserver.bodyFocus);
		}
	},
	status:function(){
		swfName(GFWindowObserver.swfID).getStatus(GFWindowObserver.isActive, GFWindowObserver.bodyFocus);
	},
	_swfFocus:function(){
		if(isIE){
			GFWindowObserver.isActive=true;
			GFWindowObserver.bodyFocus=false;
			swfName(GFWindowObserver.swfID).changeStatus(GFWindowObserver.bodyFocus);
		}
	},
	_swfBlur:function(){
		if(isIE){
			GFWindowObserver.isActive=true;
			GFWindowObserver.bodyFocus=true;
			swfName(GFWindowObserver.swfID).changeStatus(GFWindowObserver.bodyFocus);
		}
	},
    _mouseUp:function(){
        if( GFWindowObserver.swfOutside ){
            swfName(GFWindowObserver.swfID).outSideUp();
        }
    },
    _mouseOver:function(){
        GFWindowObserver.swfOutside = false;
    },
    _mouseOut:function(){
        GFWindowObserver.swfOutside = true;
    }
};
swfName=function(a){
	return navigator.appName.indexOf('Microsoft')!=-1?window[a]:document[a]
};
var isIE;
GFWindowObserver.init=function(a){
	GFWindowObserver=win.GFWindowObserver=new GFWindowObserver(a);
	win.onblur=GFWindowObserver._onBlur;
	win.onfocus=GFWindowObserver._onFocus;
    win.addEventListener( 'mouseup', GFWindowObserver._mouseUp );
    swfName(GFWindowObserver.swfID).addEventListener('mouseout',GFWindowObserver._mouseOut);
    swfName(GFWindowObserver.swfID).addEventListener('mouseover', GFWindowObserver._mouseOver );
	isIE=/*@cc_on!@*/false;
	swfName(GFWindowObserver.swfID).onfocus=GFWindowObserver._swfFocus;
	swfName(GFWindowObserver.swfID).onblur=GFWindowObserver._swfBlur;
};
