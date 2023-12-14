export default function pdfConverter(props) {
  function base64ToArrayBuffer(base64) {
    var binaryString = window.atob(base64);
    var binaryLen = binaryString.length;
    var bytes = new Uint8Array(binaryLen);
    for (var i = 0; i < binaryLen; i++) {
      var ascii = binaryString.charCodeAt(i);
      bytes[i] = ascii;
    }
    return bytes;
  }

  if (props !== null) {
    const base64Pdf = props;
    const pdf = base64ToArrayBuffer(base64Pdf);
    const file = new Blob([pdf], { type: "application/pdf" });
    const blobUrl = URL.createObjectURL(file);
    window.open(blobUrl, "_blank");
  }
}
