
export class DHStep{
	
	constructor(Rad,t,alph,delt){
		this.Radius=Rad
		this.Theta=t
		this.Alpha=alph
		this.Delta=delt
	}
}

export class DHChain{
	constructor(loc,offset,links){
		this.handLocation=loc
		this.ChainOffset=offset
		this.listOfLinks=links
		this.tip = new THREE.Matrix4();
		console.log(links)
	}
	
	getTip(index){
		
		return tip;
	}
}