---
title: MY ATTEMPT ON COMPRESSION SOFTWARE USING RUST PT 1
pubDate: 2026-06-08
description: This is my attempt on building a compression software using Rust
tags:
  - RUST
  - COMPRESSION_ALGORITHM
  - zip
  - reduce_storage
  - imapact_on_society
draft: true
---
## SHORT GLIMPES ON COMPRESIION SOFTWARES AND ALGORITHMS 

Compression Algorithms have existed for a long time. It began as an attempt to reduce the file size because storing information was a difficult and expensive task in earlier days of computing. Nowadays we get storing information is not a huge task but rather sending information from one computer to another has gotten verry expensive. Sending bulks of  information in the internet has also caused spikes in energy consumption. Thus In order to push my innovation to the limits I take my time off to learn about Compression.


![binary](attachments/binary.jpg)
*Photo by [Joshua Hoehne](https://unsplash.com/@joshua_hoehne) on [Unsplash](https://unsplash.com/?utm_source=Obsidian%20Image%20Manager&utm_medium=referral)*


## ALGORITHMS


They are dived into two types depending upon whether the compression algorithms loose or not loose the pixels of image after compression

- lossy
- lossless

for now I want to focus on Lossless algorithms like
- RUN LENGTH ENCODDING
- DICTIONARY ENCODDING
- HUFFMAN CODDING

## STARTING STEPS OF THE PROJECT
create project directory
create the projects with these commands
```bash
cargo init
```

```bash
cargo run
```

## RUN LENGTH ENCODDING

First i want to Show you one example (a basic picture) of how this algorithm looks like 


**example**:
PAAAAANDA
**after applying the algorithm**:
P5ANDA

**example**:
WWWWWAAAAHHH
**after applying the algorithm**:
5W4A3H


Of course this is just a basic picture of what this algorithm does. This has been implemented in several ways throughout history.

My implementation of this algorithm is as shown 
**expalin here**




## FEW TERMS TO KNOW:

1. **Compression ratio**:  It is size of compressed file divided by size of original file
2. **WinZip, WinRAR, 7zip**: Examples of compression software
3. **LOSSY and LOSSLESS COMPRESSION** : Compression algorithms that loose or not loose the pixels of image after compression
4. **RUN LENGTH ENCODDING**: A algorithm used for lossless compression
5. **DICTIONARY ENCODDING**: A algorithm that assigns the parts of the file binary values that are arranged in the descending order according to the number of times it occurs in the file.
6. **HUFFMAN CODDING**: A algorithm that uses binary tree to compress data