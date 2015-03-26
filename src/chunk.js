bs3u.Chunk = function(number, file, startRange, endRange) {
  this.number = number;
  this.file = file;
  this.startRange = startRange;
  this.endRange = endRange;
  this.eTag = null;
  this.status = "pending"; // pending, uploading, complete
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
