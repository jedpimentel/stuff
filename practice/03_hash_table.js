// Implement a Hash Table including its helper methods: Insert, Retrieve, and Remove

// (string, int) => int;
function stringHash(stringKey, size) {
	const string = stringKey.toString();
	let sum = 0;
	for (let i = 0; i < string.length; i++) {
		 sum += string.charCodeAt(i);
	}
	return sum % size;
}

class HashTable {
	constructor(size = 20, hashFunction = stringHash) {
		this.hasher = key => hashFunction(key, size);
		this.bucket = [];

		while (this.bucket.length < size) {
			this.bucket.push(new Map());
		}

	}
	insert(key, value) {
		const index = this.hasher(key);
		this.bucket[index].set(key, value);
	}
	retrieve(key) {
		// returns undefined if key is not indexed
		const index = this.hasher(key);
		return this.bucket[index].get(key);
	}
	delete(key) {
		const index = this.hasher(key);
		this.bucket[index].delete(key);
	}
}



// NOTE: I 
const threeWords = "this is test";
const bunchaWords = "Needlelike pelorization quenchable pseudocotyledonary harappa lasagne souk kilojoule suffusedly demoraliser pyrosulfate. Nox chemotherapeutic indwelling unsimplifying priscilla epitomize fluophosphate semivolcanically untoned sarcolemmata omicron. Evader outcrept bowingly paronomastic hailer diphthongal defamed intertinged cauliculus unetched noncompulsion. Bromise accusant deglamorize hypnotize baedeker liquidate outtrade ascertainable vapour fordo litd. Chancefully burgrave deformational outdrawn scopophilic unclearable electroplating formulizing melos faucal democratizing. Marduk salicet click northcliffe dallied hermitship lisle pragmatism cuchullain perse nonadventitious. Ethnolinguist frontstall issuably doxies effervescency uncomprehensible lashingly circumfluent hammiest caseload mislike. Breakpoint lemonfish phren carping contractibleness day unmuttering hemagglutinated randomness readvise uninferential. Grenadiership grover occasions ito unruled taft hysterically clinkstone divine narvez berg. Soapy beside munch immunologically acrylyl peddle cataracted toklas condonable trihydrate konev. Isoagglutinin hetairai reductional chilotomy mastix munnion kraepelin unriddle beltline ucayali unmew. Unemployable camailed anathematization claytonia harmonite porsenna boost cyanoderma candlewood illimani characin.";
const thausandWords = "the of to and a in is it you that he was for on are with as I his they be at one have this from or had by not word but what some we can out other were all there when up use your how said an each she which do their time if will way about many then them write would like so these her long make thing see him two has look more day could go come did number sound no most people my over know water than call first who may down side been now find any new work part take get place made live where after back little only round man year came show every good me give our under name very through just form sentence great think say help low line differ turn cause much mean before move right boy old too same tell does set three want air well also play small end put home read hand port large spell add even land here must big high such follow act why ask men change went light kind off need house picture try us again animal point mother world near build self earth father head stand own page should country found answer school grow study still learn plant cover food sun four between state keep eye never last let thought city tree cross farm hard start might story saw far sea draw left late run don't while press close night real life few north open seem together next white children begin got walk example ease paper group always music those both mark often letter until mile river car feet care second book carry took science eat room friend began idea fish mountain stop once base hear horse cut sure watch color face wood main enough plain girl usual young ready above ever red list though feel talk bird soon body dog family direct pose leave song measure door product black short numeral class wind question happen complete ship area half rock order fire south problem piece told knew pass since top whole king space heard best hour better true during hundred five remember step early hold west ground interest reach fast verb sing listen six table travel less morning ten simple several vowel toward war lay against pattern slow center love person money serve appear road map rain rule govern pull cold notice voice unit power town fine certain fly fall lead cry dark machine note wait plan figure star box noun field rest correct able pound done beauty drive stood contain front teach week final gave green oh quick develop ocean warm free minute strong special mind behind clear tail produce fact street inch multiply nothing course stay wheel full force blue object decide surface deep moon island foot system busy test record boat common gold possible plane stead dry wonder laugh thousand ago ran check game shape equate hot miss brought heat snow tire bring yes distant fill east paint language among grand ball yet wave drop heart am present heavy dance engine position arm wide sail material size vary settle speak weight general ice matter circle pair include divide syllable felt perhaps pick sudden count square reason length represent art subject region energy hunt probable bed brother egg ride cell believe fraction forest sit race window store summer train sleep prove lone leg exercise wall catch mount wish sky board joy winter sat written wild instrument kept glass grass cow job edge sign visit past soft fun bright gas weather month million bear finish happy hope flower clothe strange gone jump baby eight village meet root buy raise solve metal whether push seven paragraph third shall held hair describe cook floor either result burn hill safe cat century consider type law bit coast copy phrase silent tall sand soil roll temperature finger industry value fight lie beat excite natural view sense ear else quite broke case middle kill son lake moment scale loud spring observe child straight consonant nation dictionary milk speed method organ pay age section dress cloud surprise quiet stone tiny climb cool design poor lot experiment bottom key iron single stick flat twenty skin smile crease hole trade melody trip office receive row mouth exact symbol die least trouble shout except wrote seed tone join suggest clean break lady yard rise bad blow oil blood touch grew cent mix team wire cost lost brown wear garden equal sent choose fell fit flow fair bank collect save control decimal gentle woman captain practice separate difficult doctor please protect noon whose locate ring character insect caught period indicate radio spoke atom human history effect electric expect crop modern element hit student corner party supply bone rail imagine provide agree thus capital won't chair danger fruit rich thick soldier process operate guess necessary sharp wing create neighbor wash bat rather crowd corn compare poem string bell depend meat rub tube famous dollar stream fear sight thin triangle planet hurry chief colony clock mine tie enter major fresh search send yellow gun allow print dead spot desert suit current lift rose continue block chart hat sell success company subtract event particular deal swim term opposite wife shoe shoulder spread arrange camp invent cotton born determine quart nine truck noise level chance gather shop stretch throw shine property column molecule select wrong gray repeat require broad prepare salt nose plural anger claim continent oxygen sugar death pretty skill women season solution magnet silver thank branch match suffix especially fig afraid huge sister steel discuss forward similar guide experience score apple bought led pitch coat mass card band rope slip win dream evening condition feed tool total basic smell valley nor double seat arrive master track parent shore division sheet substance favor connect post spend chord fat glad original share station dad bread charge proper bar offer segment slave duck instant market degree populate chick dear enemy reply drink occur support speech nature range steam motion path liquid log meant quotient teeth shell neck";


function testHash(wordSet, size) {
	const counter = [];
	for (let i = 0; i < size; i++) {
		counter.push(0);
	}

	const words = wordSet.split(' ');
	words.forEach(w => {
		const hash = stringHash(w, size);
		counter[hash]++;
	})

	return counter;
}

function test() {
	// console.log(testHash(threeWords, 5));
	// console.log(testHash(bunchaWords, 10));
	// console.log(testHash(thausa, 20));
	const table = new HashTable(10);
	console.log(table.bucket);
	table.insert('red', "is an warm color");
	table.insert('blue', "is a cold color");
	table.insert('green', 'is neither, and exists between them');
	console.log(table.bucket);
	console.log(table.retrieve('blue'));
	table.delete('red');
	console.log(table.bucket);
	
}

// https://leetcode.com/problems/two-sum/
// using this hash table
{
	var twoSum = function(nums, target) {
	    // O(1) time and O(n) space
	    // key: num value; value: num index
	    const indexTable = new HashTable();
	    for (let i = 0; i < nums.length; i++) {
	        const n = nums[i];
	        const inverse = target - n;
	        const inverseIndex = indexTable.retrieve(inverse)
	        if (inverseIndex !== undefined) {
	            return [inverseIndex, i];
	        }
	        indexTable.insert(n, i);
	    };
	    // return [null, null];
	};
}
// using Map
{
	var twoSum = function(nums, target) {
	    const indexTable = new Map();
	    for (let i = 0; i < nums.length; i++) {
	        const n = nums[i];
	        const inverse = target - n;
	        const inverseIndex = indexTable.get(inverse)
	        if (inverseIndex !== undefined) {
	            return [inverseIndex, i];
	        }
	        indexTable.set(n, i);
	    };
	    // return [null, null];
	};
}