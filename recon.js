const faceapi = require("face-api.js");
const canvas = require("canvas");

async function loadModels() {
  await faceapi.tf.setBackend("tensorflow");
  await faceapi.tf.ready();

  await faceapi.nets.faceRecognitionNet.loadFromDisk("./weights");
  await faceapi.nets.ssdMobilenetv1.loadFromDisk("./weights");
  await faceapi.nets.faceLandmark68Net.loadFromDisk("./weights");
  console.log("Loaded face recognition net");
}

async function image(input) {
  const img = await canvas.loadImage(input);
  const c = canvas.createCanvas(img.width, img.height);
  const ctx = c.getContext("2d");
  ctx.drawImage(img, 0, 0, img.width, img.height);
  // const out = fs.createWriteStream('test.jpg');
  // const stream = c.createJPEGStream({ quality: 0.6, progressive: true, chromaSubsampling: true });
  // stream.pipe(out);
  return c;
}

async function detect(tensor) {
  const minConfidence = 0.15;
  const maxResults = 5;

  optionsSSDMobileNet = new faceapi.SsdMobilenetv1Options({
    minConfidence,
    maxResults,
  });

  const result = await faceapi
    .detectAllFaces(tensor, optionsSSDMobileNet)
    .withFaceLandmarks()
    .withFaceDescriptors();
  return result;
}

async function matchFace(face1Url, face2Url) {
  const img1 = await detect(await image(face1Url));
  if (!img1 || img1.length === 0) {
    return false;
  }
  const desc1 = img1[0].descriptor;

  const img2 = await detect(await image(face2Url));
  if (!img2 || img2.length === 0) {
    return false;
  }
  const desc2 = img2[0].descriptor;

  const distance = faceapi.utils.round(faceapi.euclideanDistance(desc1, desc2));

  const threshold = 0.6;
  console.log("distance", distance);

  return distance < threshold;
}

module.exports = {
  loadModels,
  matchFace,
};
