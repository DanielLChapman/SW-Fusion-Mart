
	getTotal () {
		
		let totalEleHigh = 0,
			totalEleMid = 0,
			totalEleLow = 0,
			totalMagHigh = 0,
			totalMagMid = 0,
			totalMagLow = 0;

		// eslint-disable-next-line
		Object.keys(monsters).map( (e) => {
			if (e === 'arang' || e === 'mikene' || e === 'akia' || e === 'lingling') {
				totalMagLow += monsters[e].lowMagic;
				totalMagMid  += monsters[e].midMagic;
				totalMagHigh += monsters[e].highMagic;
				totalEleLow += monsters[e].lowEle;
				totalEleMid += monsters[e].midEle;
				totalEleHigh += monsters[e].highEle;
				// eslint-disable-next-line
				monsters[e].requires.map((f) => {
					totalMagLow += monsters[f].lowMagic;
					totalMagMid  += monsters[f].midMagic;
					totalMagHigh += monsters[f].highMagic;
					totalEleLow += monsters[f].lowEle;
					totalEleMid += monsters[f].midEle;
					totalEleHigh += monsters[f].highEle;
				})
			}
			totalMagLow += monsters[e].lowMagic;
			totalMagMid  += monsters[e].midMagic;
			totalMagHigh += monsters[e].highMagic;
			totalEleLow += monsters[e].lowEle;
			totalEleMid += monsters[e].midEle;
			totalEleHigh += monsters[e].highEle;
		});

		return (
			<ul>
				Totals
				<li>Total Magic Low : {totalMagLow}</li>
				<li>Total Magic Mid : {totalMagMid}</li>
				<li>Total Magic High : {totalMagHigh}</li>
				<li>Total Elemental Low : {totalEleLow}</li>
				<li>Total Elemental Mid : {totalEleMid}</li>
				<li>Total Elemental High : {totalEleHigh}</li>
			</ul>
		)
	}