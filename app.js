gameWindow.width = window.innerWidth;
gameWindow.height = window.innerHeight;

var vertexShaderRaw = `#version 300 es
precision mediump float;

layout(location = 0) in vec3 verticePos;
layout(location = 1) in vec3 verticeColor;

out vec3 fragColor;

uniform mat4 world;
uniform mat4 viewProjection;

void main(){
	fragColor = verticeColor;
	gl_Position = viewProjection * world * vec4(verticePos, 1.0);
}`

var fragmentShaderRaw = `#version 300 es
precision mediump float;

in vec3 fragColor;

out vec4 outColor;

void main(){
	outColor = vec4(fragColor, 1.0);
}`

var boxVertices = 
[ // X, Y, Z           R, G, B
	// Top
	-1.0, 1.0, -1.0,   0.5, 0.5, 0.5,
	-1.0, 1.0, 1.0,    0.5, 0.5, 0.5,
	1.0, 1.0, 1.0,     0.5, 0.5, 0.5,
	1.0, 1.0, -1.0,    0.5, 0.5, 0.5,

	// Left
	-1.0, 1.0, 1.0,    0.75, 0.25, 0.5,
	-1.0, -1.0, 1.0,   0.75, 0.25, 0.5,
	-1.0, -1.0, -1.0,  0.75, 0.25, 0.5,
	-1.0, 1.0, -1.0,   0.75, 0.25, 0.5,

	// Right
	1.0, 1.0, 1.0,    0.25, 0.25, 0.75,
	1.0, -1.0, 1.0,   0.25, 0.25, 0.75,
	1.0, -1.0, -1.0,  0.25, 0.25, 0.75,
	1.0, 1.0, -1.0,   0.25, 0.25, 0.75,

	// Front
	1.0, 1.0, 1.0,    1.0, 0.0, 0.15,
	1.0, -1.0, 1.0,    1.0, 0.0, 0.15,
	-1.0, -1.0, 1.0,    1.0, 0.0, 0.15,
	-1.0, 1.0, 1.0,    1.0, 0.0, 0.15,

	// Back
	1.0, 1.0, -1.0,    0.0, 1.0, 0.15,
	1.0, -1.0, -1.0,    0.0, 1.0, 0.15,
	-1.0, -1.0, -1.0,    0.0, 1.0, 0.15,
	-1.0, 1.0, -1.0,    0.0, 1.0, 0.15,

	// Bottom
	-1.0, -1.0, -1.0,   0.5, 0.5, 1.0,
	-1.0, -1.0, 1.0,    0.5, 0.5, 1.0,
	1.0, -1.0, 1.0,     0.5, 0.5, 1.0,
	1.0, -1.0, -1.0,    0.5, 0.5, 1.0,
];

var boxIndices =
[
	// Top
	0, 1, 2,
	0, 2, 3,

	// Left
	5, 4, 6,
	6, 4, 7,

	// Right
	8, 9, 10,
	8, 10, 11,

	// Front
	13, 12, 14,
	15, 14, 12,

	// Back
	16, 17, 18,
	16, 18, 19,

	// Bottom
	21, 20, 22,
	22, 20, 23
];

var sphereVertices = [
  0.0, 0.0, -1.0, 0.2510194762311123, 0.4934672143232558, 0.21635818497384607,
  0.0, 0.3826834559440613, -0.9238795042037964, 0.4069547960959835, 0.8168252666875548, 0.3942962504476887,
  0.14644663035869598, 0.3535534143447876, -0.9238795042037964, 0.5208729919942914, 0.22688267490234315, 0.5964755425849837,
  4.470348358154297e-07, 0.7071065902709961, -0.7071067690849304, 0.3860674559933879, 0.6631203815829436, 0.10097771608034589,
  0.3535534143447876, 0.8535533547401428, -0.3826834559440613, 0.7828677773950387, 0.6908748756115745, 0.07311437793903464,
  0.27059805393218994, 0.6532814502716064, -0.7071067690849304, 0.2579012361246349, 0.8699620655799793, 0.8766677308279435,
  0.0, 0.9238795042037964, 0.3826834559440613, 0.45586569779323494, 0.5227099843718472, 0.43143253075694765,
  0.3826834559440613, 0.9238795042037964, 0.0, 0.3617543777190638, 0.5071887427736861, 0.7773799127849771,
  0.0, 1.0, 0.0, 0.7169962167132758, 0.9376447014510921, 0.20203776071063229,
  4.470348358154297e-07, 0.7071065902709961, 0.7071067690849304, 0.36424338473257223, 0.9412503295144511, 0.10637820817916643,
  0.14644663035869598, 0.3535534143447876, 0.9238795042037964, 0.41567666100623435, 0.5816423783770643, 0.02550110996018995,
  0.27059805393218994, 0.6532814502716064, 0.7071067690849304, 0.774791608718336, 0.9858917026602594, 0.6685198581586628,
  0.0, 0.9238795042037964, -0.3826834559440613, 0.7828831813918854, 0.6133524075936746, 0.8033137177941037,
  0.3535534143447876, 0.8535533547401428, 0.3826834559440613, 0.8078721203968064, 0.9493254929858069, 0.07639141151433082,
  2.384185791015625e-07, 0.3826834559440613, 0.9238795042037964, 0.7964240362963011, 0.21366832650359036, 0.633122795939492,
  0.0, 0.0, 1.0, 0.006196601012392611, 0.9552650495971645, 0.42083318165475303,
  0.5, 0.4999999403953552, -0.7071067690849304, 0.928227995019216, 0.9439601107504234, 0.5208688833343453,
  0.27059808373451233, 0.27059805393218994, -0.9238795042037964, 0.026664609793921823, 0.7357705884362018, 0.45396164961192487,
  0.6532815098762512, 0.6532814502716064, -0.3826834559440613, 0.7383649613489691, 0.27752928741389415, 0.14211619231311912,
  0.5, 0.4999999403953552, 0.7071067690849304, 0.30176146198216414, 0.3530353680301942, 0.1925459569164628,
  0.6532815098762512, 0.6532814502716064, 0.3826834559440613, 0.7029385797621029, 0.6306585464943498, 0.3353748018853836,
  0.27059808373451233, 0.27059805393218994, 0.9238795042037964, 0.4566021357093264, 0.025425123188792642, 0.09151914400886096,
  0.7071068286895752, 0.7071067094802856, 0.0, 0.2294879146766694, 0.19743707768801733, 0.549414279761185,
  0.8535534143447876, 0.35355332493782043, -0.3826834559440613, 0.29607480528200303, 0.15969029966251846, 0.24935375156788708,
  0.8535534143447876, 0.35355332493782043, 0.3826834559440613, 0.9843156887505503, 0.2993283984199525, 0.6234749183175808,
  0.3535534143447876, 0.1464465856552124, 0.9238795042037964, 0.27134688007970764, 0.8071390685055949, 0.9709034345182901,
  0.3535534143447876, 0.1464465856552124, -0.9238795042037964, 0.3654789616792157, 0.6223311154433958, 0.8519396579677991,
  0.6532814502716064, 0.2705979645252228, -0.7071067690849304, 0.1850283552067472, 0.3142977286004802, 0.22975060222765542,
  0.9238795638084412, 0.38268330693244934, 0.0, 0.6141653011663379, 0.561795343271322, 0.20766436520377562,
  0.6532814502716064, 0.2705979645252228, 0.7071067690849304, 0.9773758136636552, 0.7780197177237846, 0.694886228835594,
  0.3826834559440613, -4.470348358154297e-08, -0.9238795042037964, 0.053625604927702186, 0.13640377353808464, 0.07288293905235654,
  0.7071067094802856, -8.940696716308594e-08, -0.7071067690849304, 0.5619576803036598, 0.22254553742846328, 0.5647368365711959,
  0.9238795042037964, -1.1920928955078125e-07, 0.3826834559440613, 0.6261138583724676, 0.5280866425667472, 0.7172924585035724,
  1.0, -1.4901161193847656e-07, 0.0, 0.9582239785058566, 0.6637017733239395, 0.3983514953814379,
  0.7071067094802856, -8.940696716308594e-08, 0.7071067690849304, 0.30758359287928183, 0.7228212115636262, 0.7967010777533212,
  0.9238795042037964, -1.1920928955078125e-07, -0.3826834559440613, 0.9892891855778916, 0.06897816999583761, 0.7951254852308365,
  0.3826834559440613, -4.470348358154297e-08, 0.9238795042037964, 0.40089554303849706, 0.07543963470527393, 0.7857688318625822,
  0.853553295135498, -0.35355353355407715, 0.3826834559440613, 0.917930606096784, 0.3011425715097289, 0.9959727561481411,
  0.9238794445991516, -0.3826836049556732, 0.0, 0.4346850578967745, 0.8160355722578038, 0.5889239076433234,
  0.6532813310623169, -0.2705981433391571, 0.7071067690849304, 0.5494054065009759, 0.48628200930463306, 0.20866725203433756,
  0.3535533845424652, -0.14644667506217957, -0.9238795042037964, 0.3616360412030388, 0.9673744525644514, 0.09027640546662608,
  0.853553295135498, -0.35355353355407715, -0.3826834559440613, 0.3919206649406032, 0.8874321089514396, 0.06385795599560928,
  0.3535533845424652, -0.14644667506217957, 0.9238795042037964, 0.048533221007911576, 0.4984777193075163, 0.18768236265910887,
  0.6532813310623169, -0.2705981433391571, -0.7071067690849304, 0.8247711050201331, 0.7488919801579318, 0.2203187232784134,
  0.27059799432754517, -0.2705981135368347, -0.9238795042037964, 0.595268426819111, 0.3623498964753732, 0.7419762424635892,
  0.6532813310623169, -0.653281569480896, -0.3826834559440613, 0.19848790472388622, 0.7892730085171651, 0.39372643964664933,
  0.6532813310623169, -0.653281569480896, 0.3826834559440613, 0.7520855261292371, 0.3432328829803116, 0.8778405573470492,
  0.27059799432754517, -0.2705981135368347, 0.9238795042037964, 0.8759794153118083, 0.7731268181313921, 0.2520505076545785,
  0.4999998211860657, -0.5000000596046448, -0.7071067690849304, 0.19425716086801492, 0.31941103178159214, 0.6734323478689833,
  0.7071065902709961, -0.7071069478988647, 0.0, 0.06829822027776522, 0.6376339010179543, 0.9642335245279916,
  0.4999998211860657, -0.5000000596046448, 0.7071067690849304, 0.6882122796932033, 0.7945362547501121, 0.8389370294165857,
  0.3535531759262085, -0.8535534143447876, 0.3826834559440613, 0.3384616812483442, 0.08455561128643951, 0.3784391031901887,
  0.14644652605056763, -0.35355344414711, 0.9238795042037964, 0.17844774154844456, 0.03271925253942254, 0.3138237946667267,
  0.14644652605056763, -0.35355344414711, -0.9238795042037964, 0.9031824642166534, 0.4024872100856325, 0.5710416240734275,
  0.3535531759262085, -0.8535534143447876, -0.3826834559440613, 0.3906652275250475, 0.37479289939642013, 0.08135080796779581,
  0.27059781551361084, -0.6532814502716064, -0.7071067690849304, 0.8660192864463919, 0.24019472617603144, 0.6611960020703682,
  0.382683128118515, -0.9238796234130859, 0.0, 0.8610722430222459, 0.6971109481012858, 0.9296023496509448,
  0.27059781551361084, -0.6532814502716064, 0.7071067690849304, 0.4008980178833107, 0.8036983694170932, 0.3745701379555585,
  -1.1920928955078125e-07, -0.3826834559440613, -0.9238795042037964, 0.6667478212792812, 0.8913077313873171, 0.6272545013723145,
  -2.384185791015625e-07, -0.9238794445991516, -0.3826834559440613, 0.16641231884492502, 0.34351454772644885, 0.830777834154844,
  -2.2351741790771484e-07, -0.7071066498756409, -0.7071067690849304, 0.6509498430694085, 0.24583109879783893, 0.635374406734925,
  -2.384185791015625e-07, -0.9238794445991516, 0.3826834559440613, 0.8371885887557821, 0.3415383893277415, 0.6370576879491109,
  -3.5762786865234375e-07, -1.0, 0.0, 0.4436027384654402, 0.2232083963829663, 0.29153200760334563,
  -2.2351741790771484e-07, -0.7071066498756409, 0.7071067690849304, 0.3804023040745188, 0.5355379406605763, 0.44875569038435803,
  -1.1920928955078125e-07, -0.3826834559440613, 0.9238795042037964, 0.06481633235976958, 0.3688654498146563, 0.7765973431902724,
  -0.14644673466682434, -0.3535533547401428, 0.9238795042037964, 0.3130278932364723, 0.7896171569768167, 0.8939846034979039,
  -0.27059823274612427, -0.6532812714576721, 0.7071067690849304, 0.4033762996612077, 0.6467538382739111, 0.16405485265739483,
  -0.14644673466682434, -0.3535533547401428, -0.9238795042037964, 0.26234106170638183, 0.48838964339421065, 0.11844290414138692,
  -0.3535535931587219, -0.8535531759262085, -0.3826834559440613, 0.33368287467222646, 0.6256750469756799, 0.972257737477484,
  -0.3535535931587219, -0.8535531759262085, 0.3826834559440613, 0.5997273452117313, 0.020298400547972495, 0.42561015982350403,
  -0.27059823274612427, -0.6532812714576721, -0.7071067690849304, 0.20804648234699752, 0.5697083794426203, 0.6811389252740728,
  -0.38268378376960754, -0.9238793849945068, 0.0, 0.6901901415928275, 0.7950547097157912, 0.6377871484961882,
  -0.2705981731414795, -0.2705979645252228, -0.9238795042037964, 0.07781212232836032, 0.9801909725741974, 0.8840345991639391,
  -0.653281569480896, -0.6532812118530273, -0.3826834559440613, 0.5271899621696148, 0.8314771983870605, 0.49520038045306347,
  -0.653281569480896, -0.6532812118530273, 0.3826834559440613, 0.6067681868785718, 0.659603158960359, 0.4026492404082742,
  -0.2705981731414795, -0.2705979645252228, 0.9238795042037964, 0.8402183242452087, 0.778577234753907, 0.3332905975190149,
  -0.5000001192092896, -0.4999997019767761, -0.7071067690849304, 0.8567455830228747, 0.35972553027171905, 0.9520818475878907,
  -0.7071070671081543, -0.7071064710617065, 0.0, 0.7700560359556401, 0.9573682435437386, 0.9970919978503318,
  -0.5000001192092896, -0.4999997019767761, 0.7071067690849304, 0.9372433317404674, 0.7099001025803612, 0.9097817613437645,
  -0.3535534739494324, -0.14644646644592285, 0.9238795042037964, 0.5820332660569822, 0.9377907861035235, 0.3712577945166733,
  -0.3535534739494324, -0.14644646644592285, -0.9238795042037964, 0.769825417477857, 0.8873592241086646, 0.20066325246016092,
  -0.8535534143447876, -0.35355305671691895, -0.3826834559440613, 0.8477011774057714, 0.6901623017529468, 0.6223893331178988,
  -0.6532814502716064, -0.2705976963043213, -0.7071067690849304, 0.7871288058572707, 0.827118249239303, 0.9371175503001783,
  -0.8535534143447876, -0.35355305671691895, 0.3826834559440613, 0.7094373046736863, 0.7485642625738548, 0.05722100677114894,
  -0.9238796830177307, -0.3826829791069031, 0.0, 0.9933249230247366, 0.7377960344931407, 0.6186106638323114,
  -0.6532814502716064, -0.2705976963043213, 0.7071067690849304, 0.03827732032621123, 0.8781457331551362, 0.5761931475947496,
  -0.9238793849945068, 3.5762786865234375e-07, -0.3826834559440613, 0.7744100015105075, 0.7352887799787386, 0.9409527515516705,
  -0.7071065902709961, 3.2782554626464844e-07, -0.7071067690849304, 0.42435304134415575, 0.5082516439748906, 0.8538329656101865,
  -0.9238793849945068, 3.5762786865234375e-07, 0.3826834559440613, 0.8571952107400995, 0.7172008283202973, 0.1801048426700329,
  -0.9999999403953552, 5.066394805908203e-07, 0.0, 0.2525227986254388, 0.4149808226366317, 0.7511233354381575,
  -0.7071065902709961, 3.2782554626464844e-07, 0.7071067690849304, 0.8143207144565427, 0.7809903983953398, 0.9352704971120168,
  -0.3826834559440613, 1.7881393432617188e-07, -0.9238795042037964, 0.4312261996989162, 0.7639514910959242, 0.20456364780868153,
  -0.3826834559440613, 1.7881393432617188e-07, 0.9238795042037964, 0.8041801644581608, 0.2858610742045471, 0.058988988074839765,
  -0.3535533547401428, 0.14644679427146912, -0.9238795042037964, 0.7919381553500993, 0.8187895293914532, 0.019303753744522978,
  -0.8535531163215637, 0.3535536825656891, -0.3826834559440613, 0.2930424544290894, 0.32985625951151387, 0.6239543746576849,
  -0.8535531163215637, 0.3535536825656891, 0.3826834559440613, 0.6178452810711073, 0.029647859266765164, 0.6212121825570946,
  -0.3535533547401428, 0.14644679427146912, 0.9238795042037964, 0.7703023455666486, 0.8711621128184807, 0.8135702639788662,
  -0.6532811522483826, 0.27059829235076904, -0.7071067690849304, 0.0634023395798965, 0.13399388813080515, 0.34249129399256084,
  -0.9238792657852173, 0.3826839029788971, 0.0, 0.7059085947459443, 0.8054129091223775, 0.9528681654451384,
  -0.6532811522483826, 0.27059829235076904, 0.7071067690849304, 0.5519227800707689, 0.5866213929092905, 0.31910176395666356,
  -0.6532810926437378, 0.6532816886901855, -0.3826834559440613, 0.9588452940110578, 0.1836728343398677, 0.9448886103927672,
  -0.6532810926437378, 0.6532816886901855, 0.3826834559440613, 0.33348952026173895, 0.6000272095987402, 0.39319466881080833,
  -0.2705979347229004, 0.27059823274612427, 0.9238795042037964, 0.28517141037273475, 0.25099358410145545, 0.9970210152007034,
  -0.2705979347229004, 0.27059823274612427, -0.9238795042037964, 0.15353526361868897, 0.7907505411535812, 0.6187593156127286,
  -0.4999995827674866, 0.5000001192092896, -0.7071067690849304, 0.5834319529595906, 0.7726967206974199, 0.5438385145465845,
  -0.707106351852417, 0.7071071267127991, 0.0, 0.5665942650942741, 0.6533289257455187, 0.33143283177386385,
  -0.4999995827674866, 0.5000001192092896, 0.7071067690849304, 0.5447916837387242, 0.07266618213314524, 0.2746742617404594,
  -0.14644640684127808, 0.35355350375175476, -0.9238795042037964, 0.7494034587780205, 0.40787408999530894, 0.29703909128225203,
  -0.353552907705307, 0.8535534143447876, -0.3826834559440613, 0.6899937147584929, 0.11873398930624146, 0.35616092760934326,
  -0.27059757709503174, 0.6532814502716064, -0.7071067690849304, 0.7541129077365478, 0.14224166128022364, 0.9638342215361868,
  -0.353552907705307, 0.8535534143447876, 0.3826834559440613, 0.7711960212406624, 0.18632695450439807, 0.03176434707916875,
  -0.3826828896999359, 0.9238797426223755, 0.0, 0.16090107800820175, 0.00805959338342277, 0.46007766751074486,
  -0.27059757709503174, 0.6532814502716064, 0.7071067690849304, 0.6403166320561513, 0.9298424537928688, 0.7232914542396676,
  -0.14644640684127808, 0.35355350375175476, 0.9238795042037964, 0.4520816911551917, 0.6945727077938235, 0.6553189204471688,
];

var sphereIndices = [
  0, 1, 2,
  3, 4, 5,
  6, 7, 8,
  9, 10, 11,
  3, 2, 1,
  8, 4, 12,
  9, 13, 6,
  14, 15, 10,
  2, 16, 17,
  7, 18, 4,
  13, 19, 20,
  10, 15, 21,
  0, 2, 17,
  4, 16, 5,
  7, 20, 22,
  10, 19, 11,
  22, 23, 18,
  19, 24, 20,
  21, 15, 25,
  0, 17, 26,
  18, 27, 16,
  22, 24, 28,
  21, 29, 19,
  17, 27, 26,
  0, 26, 30,
  23, 31, 27,
  28, 32, 33,
  25, 34, 29,
  27, 30, 26,
  28, 35, 23,
  29, 32, 24,
  25, 15, 36,
  33, 37, 38,
  36, 39, 34,
  31, 40, 30,
  33, 41, 35,
  34, 37, 32,
  36, 15, 42,
  0, 30, 40,
  31, 41, 43,
  43, 44, 40,
  38, 45, 41,
  39, 46, 37,
  42, 15, 47,
  0, 40, 44,
  43, 45, 48,
  38, 46, 49,
  39, 47, 50,
  50, 51, 46,
  47, 15, 52,
  0, 44, 53,
  48, 54, 55,
  49, 51, 56,
  47, 57, 50,
  48, 53, 44,
  49, 54, 45,
  0, 53, 58,
  55, 59, 60,
  56, 61, 62,
  52, 63, 57,
  53, 60, 58,
  56, 59, 54,
  57, 61, 51,
  52, 15, 64,
  63, 65, 66,
  60, 67, 58,
  62, 68, 59,
  63, 69, 61,
  64, 15, 65,
  0, 58, 67,
  60, 68, 70,
  62, 69, 71,
  70, 72, 67,
  71, 73, 68,
  66, 74, 69,
  65, 15, 75,
  0, 67, 72,
  70, 73, 76,
  71, 74, 77,
  66, 75, 78,
  75, 15, 79,
  0, 72, 80,
  76, 81, 82,
  77, 83, 84,
  75, 85, 78,
  76, 80, 72,
  77, 81, 73,
  78, 83, 74,
  82, 86, 87,
  84, 88, 89,
  79, 90, 85,
  80, 87, 91,
  84, 86, 81,
  85, 88, 83,
  79, 15, 92,
  0, 80, 91,
  87, 93, 91,
  89, 94, 86,
  90, 95, 88,
  92, 15, 96,
  0, 91, 93,
  87, 94, 97,
  89, 95, 98,
  92, 99, 90,
  98, 100, 94,
  99, 101, 95,
  96, 15, 102,
  0, 93, 103,
  97, 100, 104,
  98, 101, 105,
  96, 106, 99,
  97, 103, 93,
  0, 103, 107,
  104, 108, 109,
  105, 110, 111,
  102, 112, 106,
  103, 109, 107,
  105, 108, 100,
  106, 110, 101,
  102, 15, 113,
  111, 6, 8,
  113, 9, 112,
  109, 1, 107,
  111, 12, 108,
  112, 6, 110,
  113, 15, 14,
  0, 107, 1,
  109, 12, 3,
  3, 12, 4,
  6, 13, 7,
  9, 14, 10,
  3, 5, 2,
  8, 7, 4,
  9, 11, 13,
  2, 5, 16,
  7, 22, 18,
  13, 11, 19,
  4, 18, 16,
  7, 13, 20,
  10, 21, 19,
  22, 28, 23,
  19, 29, 24,
  18, 23, 27,
  22, 20, 24,
  21, 25, 29,
  17, 16, 27,
  23, 35, 31,
  28, 24, 32,
  25, 36, 34,
  27, 31, 30,
  28, 33, 35,
  29, 34, 32,
  33, 32, 37,
  36, 42, 39,
  31, 43, 40,
  33, 38, 41,
  34, 39, 37,
  31, 35, 41,
  43, 48, 44,
  38, 49, 45,
  39, 50, 46,
  43, 41, 45,
  38, 37, 46,
  39, 42, 47,
  50, 57, 51,
  48, 45, 54,
  49, 46, 51,
  47, 52, 57,
  48, 55, 53,
  49, 56, 54,
  55, 54, 59,
  56, 51, 61,
  52, 64, 63,
  53, 55, 60,
  56, 62, 59,
  57, 63, 61,
  63, 64, 65,
  60, 70, 67,
  62, 71, 68,
  63, 66, 69,
  60, 59, 68,
  62, 61, 69,
  70, 76, 72,
  71, 77, 73,
  66, 78, 74,
  70, 68, 73,
  71, 69, 74,
  66, 65, 75,
  76, 73, 81,
  77, 74, 83,
  75, 79, 85,
  76, 82, 80,
  77, 84, 81,
  78, 85, 83,
  82, 81, 86,
  84, 83, 88,
  79, 92, 90,
  80, 82, 87,
  84, 89, 86,
  85, 90, 88,
  87, 97, 93,
  89, 98, 94,
  90, 99, 95,
  87, 86, 94,
  89, 88, 95,
  92, 96, 99,
  98, 105, 100,
  99, 106, 101,
  97, 94, 100,
  98, 95, 101,
  96, 102, 106,
  97, 104, 103,
  104, 100, 108,
  105, 101, 110,
  102, 113, 112,
  103, 104, 109,
  105, 111, 108,
  106, 112, 110,
  111, 110, 6,
  113, 14, 9,
  109, 3, 1,
  111, 8, 12,
  112, 9, 6,
  109, 108, 12,
];

function rng(min, max){
	return Math.random() * (max - min) + min;
};

setTimeout(() => {

	if(!webgl){
		console.log("Webgl isn't working :(");
	}else{
		console.log("WEBGL + HTML: OPERATIONAL");
	}

	webgl.clearColor(0.0, 0.0, 0.0, 1.0);
	webgl.viewport(0, 0, gameWindow.width, gameWindow.height);
	
	window.onresize = function(){
		gameWindow.width = window.innerHeight;
		gameWindow.height = window.innerHeight;
		webgl.viewport(0, 0, gameWindow.width, gameWindow.height);
	};

	webgl.enable(webgl.DEPTH_TEST);

	var fragmentShader = webgl.createShader(webgl.FRAGMENT_SHADER);
	webgl.shaderSource(fragmentShader, fragmentShaderRaw);
	webgl.compileShader(fragmentShader);

	var vertexShader = webgl.createShader(webgl.VERTEX_SHADER);
	webgl.shaderSource(vertexShader, vertexShaderRaw);
	webgl.compileShader(vertexShader);

	webgl.attachShader(program, fragmentShader);
	webgl.attachShader(program, vertexShader);
	webgl.linkProgram(program);

	webgl.useProgram(program);
	
	var positionAttribLocation = webgl.getAttribLocation(program, 'verticePos');
	var colorAttribLocation = webgl.getAttribLocation(program, 'verticeColor');
	
	var boxVAO = webgl.createVertexArray();
	webgl.bindVertexArray(boxVAO);
	
	var boxVBO = webgl.createBuffer();
	webgl.bindBuffer(webgl.ARRAY_BUFFER, boxVBO);
	webgl.bufferData(webgl.ARRAY_BUFFER, new Float32Array(boxVertices), webgl.STATIC_DRAW);

	var boxIBO = webgl.createBuffer();
	webgl.bindBuffer(webgl.ELEMENT_ARRAY_BUFFER, boxIBO);
	webgl.bufferData(webgl.ELEMENT_ARRAY_BUFFER, new Uint16Array(boxIndices), webgl.STATIC_DRAW);

	webgl.vertexAttribPointer(positionAttribLocation, 3, webgl.FLOAT, webgl.FALSE, 6 * Float32Array.BYTES_PER_ELEMENT, 0);
	webgl.vertexAttribPointer(colorAttribLocation, 3, webgl.FLOAT, webgl.FALSE, 6 * Float32Array.BYTES_PER_ELEMENT, 3 * Float32Array.BYTES_PER_ELEMENT);

	webgl.enableVertexAttribArray(positionAttribLocation);
	webgl.enableVertexAttribArray(colorAttribLocation);
	
	var sphereVAO = webgl.createVertexArray();
	webgl.bindVertexArray(sphereVAO);
	
	var sphereVBO = webgl.createBuffer();
	webgl.bindBuffer(webgl.ARRAY_BUFFER, sphereVBO);
	webgl.bufferData(webgl.ARRAY_BUFFER, new Float32Array(sphereVertices), webgl.STATIC_DRAW);

	var sphereIBO = webgl.createBuffer();
	webgl.bindBuffer(webgl.ELEMENT_ARRAY_BUFFER, sphereIBO);
	webgl.bufferData(webgl.ELEMENT_ARRAY_BUFFER, new Uint16Array(sphereIndices), webgl.STATIC_DRAW);

	webgl.vertexAttribPointer(positionAttribLocation, 3, webgl.FLOAT, webgl.FALSE, 6 * Float32Array.BYTES_PER_ELEMENT, 0);
	webgl.vertexAttribPointer(colorAttribLocation, 3, webgl.FLOAT, webgl.FALSE, 6 * Float32Array.BYTES_PER_ELEMENT, 3 * Float32Array.BYTES_PER_ELEMENT);

	webgl.enableVertexAttribArray(positionAttribLocation);
	webgl.enableVertexAttribArray(colorAttribLocation);

	webgl.useProgram(program);

	var worldUniform = webgl.getUniformLocation(program, "world");
	var viewProjectionUniform = webgl.getUniformLocation(program, "viewProjection");

	webgl.uniform1i(webgl.getUniformLocation(program, "imageSampler"), 0);

	const worldMatrix = glMatrix.mat4.create();
	const viewMatrix = glMatrix.mat4.create();
	const projectionMatrix = glMatrix.mat4.create();
	const viewProjectionMatrix = glMatrix.mat4.create();
	
	const physicsObjectSpheres = [];
	const walls = [];
	
	var gravity = -0.03;
	var jumpPower = 40;
	
	class physicsObjectSphere{
		constructor(x, y, z, radius, mass, elasticity, acceleration_force){
			this.position = new vector3(x, y, z);
			this.radius = radius;
			this.acceleration_force = acceleration_force;
			this.velocity = new vector3(0, 0, 0);
			this.acceleration = new vector3(0, 0, 0);
			this.mass = mass;
			if(this.mass == 0){
				this.inverseMass = 0;
			}else{
				this.inverseMass = 1 / this.mass;
			};
			this.elasticity = elasticity;
			physicsObjectSpheres.push(this);
		};
		
		drawPhysicsObjectSphere(){
			webgl.bindVertexArray(sphereVAO);

			var rotation = glMatrix.quat.create();

			glMatrix.quat.setAxisAngle(rotation, [0, 1, 0], (0 * Math.PI / 180));

			var playerPosVector = glMatrix.vec3.fromValues(this.position.x, this.position.y, this.position.z);

			var playerScaleVector = glMatrix.vec3.fromValues(this.radius, this.radius, this.radius);

			glMatrix.mat4.fromRotationTranslationScale(worldMatrix, rotation, playerPosVector, playerScaleVector);

			webgl.uniformMatrix4fv(worldUniform, webgl.FALSE, worldMatrix);

			webgl.drawElements(webgl.TRIANGLES, sphereIndices.length, webgl.UNSIGNED_SHORT, 0);
		};
			
		movePhysicsObjectSphere(){
			
			//this.acceleration = forward.multiply(input.x * this.acceleration_force).add(right.multiply(input.z * this.acceleration_force));
			
			this.acceleration = this.acceleration.unit().multiply(this.acceleration_force);
			
			this.acceleration.y = gravity;
			
			this.velocity = this.velocity.add(this.acceleration);
			
			this.velocity = this.velocity.multiply(1 - friction);
			
			this.position = this.position.add(this.velocity);
		};
	};
	
	//mass 0 for stationary object
	//x, y, z, radius, mass, elasticity, acceleration force
	object1 = new physicsObjectSphere(0, 0, 0, 2, 100, 0, 0.03);

	for(var i = 0; i < 5; i++){
		//-50 to 25 for z axis
		//45 to -25 for x axis
		new physicsObjectSphere(rng(-25, 40), rng(10, 50), rng(-50, 25), rng(1, 6), rng(1, 10), rng(0,10) / 10, 0.03);
	};
	
	class wallObject{
		constructor(x1, y1, z1, x2, y2, z2){
			this.min = new vector3(Math.min(x1, x2), Math.min(y1, y2), Math.min(z1, z2));
			this.max = new vector3(Math.max(x1, x2), Math.max(y1, y2), Math.max(z1, z2));
			walls.push(this);
		};
		
		drawWall(){
			webgl.bindVertexArray(boxVAO);

			var rotation = glMatrix.quat.create();

			glMatrix.quat.setAxisAngle(rotation, [0, 1, 0], (0 * Math.PI / 180));

			var playerPosVector = glMatrix.vec3.fromValues((this.min.x + this.max.x) / 2, (this.min.y + this.max.y) / 2, (this.min.z + this.max.z) / 2);

			var playerScaleVector = glMatrix.vec3.fromValues(Math.abs(this.min.x - this.max.x) / 2, Math.abs(this.min.y - this.max.y) / 2, Math.abs(this.min.z - this.max.z) / 2);

			glMatrix.mat4.fromRotationTranslationScale(worldMatrix, rotation, playerPosVector, playerScaleVector);

			webgl.uniformMatrix4fv(worldUniform, webgl.FALSE, worldMatrix);

			webgl.drawElements(webgl.TRIANGLES, boxIndices.length, webgl.UNSIGNED_SHORT, 0);
		};
	};
	
	//x1, y1, z1, x2, y2, z2
	wall0 = new wallObject(36, -5, 26, -36, 5, 24);
	wall1 = new wallObject(36, -5, -74, -36, 5, -76);
	wall2 = new wallObject(-36, -5, 24, -38, 5, -74);
	wall3 = new wallObject(38, -5, 24, 36, 5, -19);
	wall4 = new wallObject(38, -5, -31, 36, 5, -74);
	wall4 = new wallObject(-51, -6, -76, 51, -5, 26);
	
	var friction = 0.05;
	var input = new vector3(0, 0, 0);
	
	function movePhysicsObject(){
		if(w == true){
			input.x = 1;
			//eval("object" + currentPhysicsObject).acceleration.x = eval("object" + currentPhysicsObject).acceleration_force;
		};
		if(a == true){
			input.z = -1;
			//eval("object" + currentPhysicsObject).acceleration.z = -eval("object" + currentPhysicsObject).acceleration_force;
		};
		if(s == true){
			input.x = -1;
			//eval("object" + currentPhysicsObject).acceleration.x = -eval("object" + currentPhysicsObject).acceleration_force;
		};
		if(d == true){
			input.z = 1;
			//eval("object" + currentPhysicsObject).acceleration.z = eval("object" + currentPhysicsObject).acceleration_force;
		};
		if(space == true){
			input.y = 1;
			//eval("object" + currentPhysicsObject).acceleration.y = eval("object" + currentPhysicsObject).acceleration_force;
		};
		if(ctrl == true){
			input.y = -1;
			//eval("object" + currentPhysicsObject).acceleration.y = -eval("object" + currentPhysicsObject).acceleration_force;
		};
		
		if(e == true){
			for(var i = 0; i < 25; i++){
				//-50 to 25 for z axis
				//45 to -25 for x axis
				new physicsObjectSphere(rng(-25, 40), rng(10, 50), rng(-50, 25), rng(1, 6), rng(1, 10), rng(0,10) / 10, 0.03);
			};
			e = false;
		};
		
		if(!w && !s){
			input.x = 0;
			//eval("object" + currentPhysicsObject).acceleration.x = 0;
		};
		if(!a && !d){
			input.z = 0;
			//eval("object" + currentPhysicsObject).acceleration.z = 0;
		};
		if(!space && !ctrl){
			input.y = -1;
			//eval("object" + currentPhysicsObject).acceleration.y = 0;
		};
		
		eval("object" + currentPhysicsObject).acceleration = forward.multiply(input.x * eval("object" + currentPhysicsObject).acceleration_force).add(right.multiply(input.z * eval("object" + currentPhysicsObject).acceleration_force));
	};
	
	function collisionDetectionSphere(sphere1, sphere2){
		if(sphere1.radius + sphere2.radius >= sphere2.position.subtract(sphere1.position).mag()){
			return true;
		}else{
			return false;
		};
	};
	
	function sphereCollisionResolution(sphere1, sphere2){
		var distance = sphere1.position.subtract(sphere2.position);
		var collisionDepth = sphere1.radius + sphere2.radius - distance.mag();
		var collisionResolution = distance.unit().multiply(collisionDepth / (sphere1.inverseMass + sphere2.inverseMass));
		sphere1.position = sphere1.position.add(collisionResolution.multiply(sphere1.inverseMass));
		sphere2.position = sphere2.position.add(collisionResolution.multiply(-sphere2.inverseMass));
	};
	
	function sphereCollisionPhysicsResolution(sphere1, sphere2){
		var normal = sphere1.position.subtract(sphere2.position).unit();
		var relativeVelocity = sphere1.velocity.subtract(sphere2.velocity);
		var seperationVelocity = vector3.dotProduct(relativeVelocity, normal);
		var newSeperationVelocity = -seperationVelocity * Math.min(sphere1.elasticity, sphere2.elasticity);
		
		var velocitySeperationDifference = newSeperationVelocity - seperationVelocity;
		var impulse = velocitySeperationDifference / (sphere1.inverseMass + sphere2.inverseMass);
		var impulseVector = normal.multiply(impulse);
		
		sphere1.velocity = sphere1.velocity.add(impulseVector.multiply(sphere1.inverseMass));
		sphere2.velocity = sphere2.velocity.add(impulseVector.multiply(-sphere2.inverseMass));
	};
	
	function sphereAABBCollisionDetection(sphere, wall){
		var x = Math.max(wall.min.x, Math.min(sphere.position.x, wall.max.x));
		var y = Math.max(wall.min.y, Math.min(sphere.position.y, wall.max.y));
		var z = Math.max(wall.min.z, Math.min(sphere.position.z, wall.max.z));
		
		var distance = Math.sqrt(
			(x - sphere.position.x) * (x - sphere.position.x) +  
			(y - sphere.position.y) * (y - sphere.position.y) +  
			(z - sphere.position.z) * (z - sphere.position.z)  
		);
		
		//console.log(distance);
		return distance < sphere.radius;
	};
	
	function sphereAABBCollisionResolution(sphere, wall) {
		var closestPoint = new vector3(Math.max(wall.min.x, Math.min(sphere.position.x, wall.max.x)), Math.max(wall.min.y, Math.min(sphere.position.y, wall.max.y)), Math.max(wall.min.z, Math.min(sphere.position.z, wall.max.z)));
		var penetrationVector = sphere.position.subtract(closestPoint);
		sphere.position = sphere.position.add(penetrationVector.unit().multiply(sphere.radius - penetrationVector.mag()));
	}
	
	function sphereAABBPhysicsResolution(sphere, wall) {
		var closestPoint = new vector3(Math.max(wall.min.x, Math.min(sphere.position.x, wall.max.x)), Math.max(wall.min.y, Math.min(sphere.position.y, wall.max.y)), Math.max(wall.min.z, Math.min(sphere.position.z, wall.max.z)));
		var normal = sphere.position.subtract(closestPoint).unit();
		var seperationVelocity = vector3.dotProduct(sphere.velocity, normal);
		var newSeperationVelocity = -seperationVelocity * sphere.elasticity;
		var velocitySeperationDifference = seperationVelocity - newSeperationVelocity;
		sphere.velocity = sphere.velocity.add(normal.multiply(-velocitySeperationDifference));
	}
	
	var loop = function(){

		mouseInput(eval("object" + currentPhysicsObject).position);
		movePhysicsObject();
	
		glMatrix.mat4.lookAt(viewMatrix, camPos, glMatrix.vec3.fromValues(eval("object" + currentPhysicsObject).position.x, eval("object" + currentPhysicsObject).position.y, eval("object" + currentPhysicsObject).position.z), camUp);
		glMatrix.mat4.perspective(projectionMatrix, 90 * (Math.PI / 180), gameWindow.width / gameWindow.height, 0.01, 1000);
		glMatrix.mat4.multiply(viewProjectionMatrix, projectionMatrix, viewMatrix);

		webgl.clear(webgl.COLOR_BUFFER_BIT | webgl.DEPTH_BUFFER_BIT);

		webgl.uniformMatrix4fv(worldUniform, webgl.FALSE, worldMatrix);
		webgl.uniformMatrix4fv(viewProjectionUniform, false, viewProjectionMatrix);
		
		physicsObjectSpheres.forEach((object, index) => {
			object.drawPhysicsObjectSphere();
			
			for(var i = index + 1; i < physicsObjectSpheres.length; i++){
				if(collisionDetectionSphere(physicsObjectSpheres[index], physicsObjectSpheres[i])){
					sphereCollisionResolution(physicsObjectSpheres[index], physicsObjectSpheres[i]);
					sphereCollisionPhysicsResolution(physicsObjectSpheres[index], physicsObjectSpheres[i]);
				};
			};
			
			webgl.bindVertexArray(null);
			
			walls.forEach((wall) => {
				if(sphereAABBCollisionDetection(physicsObjectSpheres[index], wall)){
					//console.log("collision");
					sphereAABBCollisionResolution(physicsObjectSpheres[index], wall);
					sphereAABBPhysicsResolution(physicsObjectSpheres[index], wall);
				};
			});
			
			object.movePhysicsObjectSphere();
		});
		
		walls.forEach((wall) => {
			wall.drawWall();
		}); 
		
		requestAnimationFrame(loop);
	};

	loop();

}, 500);