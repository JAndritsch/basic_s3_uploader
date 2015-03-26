bs3u.Chunk = function(number, file, startRange, endRange) {
  this.number = number;
  this.file = file;
  this.startRange = startRange;
  this.endRange = endRange;
  this.eTag = null;
  this.status = "pending"; // pending, uploading, complete
};

// Slices up the file into chunks, storing the startRange and endRange of each chunk on the uploader
// so the blobs can be created when needed.
bs3u.Chunk.createChunksFromFile = function(file, settings) {
  var chunks = {};
  var remainingSize, startRange, endRange, sizeOfChunk;
  var chunkSize = Math.min(settings.chunkSize, file.size);
  var totalChunks = Math.ceil(file.size / chunkSize);
  var logger = new bs3u.Logger(settings);

  logger.log("Slicing up file into chunks");

  for(var partNumber = 1; partNumber < totalChunks + 1; partNumber++) {
    remainingSize = remainingSize || file.size;
    startRange = startRange || 0;
    sizeOfChunk = sizeOfChunk || chunkSize * partNumber;

    endRange = (startRange + sizeOfChunk);
    chunks[partNumber] = new bs3u.Chunk(partNumber, file, startRange, endRange);
    startRange = (chunkSize * partNumber);
    remainingSize = remainingSize - sizeOfChunk;

    if (remainingSize < sizeOfChunk) {
      sizeOfChunk = remainingSize;
    }
  }

  logger.log("Total chunks to upload:", Object.keys(chunks).length);

  return chunks;
};

bs3u.Chunk.prototype.contents = function() {
  return this.file.slice(this.startRange, this.endRange);
};

bs3u.Chunk.prototype.size = function() {
  return this.endRange - this.startRange;
};

bs3u.Chunk.prototype.getNumber = function() {
  return this.number;
};

bs3u.Chunk.prototype.setPending = function() {
  this.status = "pending";
};

bs3u.Chunk.prototype.pending = function() {
  return this.status == "pending";
};

bs3u.Chunk.prototype.setUploading = function() {
  this.status = "uploading";
};

bs3u.Chunk.prototype.uploading = function() {
  return this.status == "uploading";
};

bs3u.Chunk.prototype.setComplete = function() {
  this.status = "complete";
};

bs3u.Chunk.prototype.complete = function() {
  return this.status == "complete";
};

bs3u.Chunk.prototype.setETag = function(eTag) {
  this.eTag = eTag;
};

bs3u.Chunk.prototype.getETag = function() {
  return this.eTag;
};
