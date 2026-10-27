#!/bin/bash
# Prompt 31: encode a v4 film from film.py's frames and sound4.py's mix: clean and captioned (captions burned into
# the lower letterbox bar), H.264 CRF 24 and AAC 160 kb/s, about 33 MB for 100 s.
# Usage: bash scripts/demos/v4/encode.sh <out dir with frames/, mix.wav, captions.vtt> <output name without .mp4>
set -e
V=$1; N=$2
enc() { ffmpeg -v error -y -framerate 24 -i "$V/frames/f%05d.jpg" -i "$V/mix.wav" "$@" -c:v libx264 -preset slow -crf 24 -tune film -pix_fmt yuv420p -c:a aac -b:a 160k -movflags +faststart -shortest; }
enc "$N.mp4"
enc -vf "subtitles=$V/captions.vtt:force_style='FontName=Manrope,FontSize=13,PrimaryColour=&H00EDEDED,BorderStyle=1,Outline=0,Shadow=0,MarginV=10'" "${N}_captioned.mp4"
cp "$V/captions.vtt" "$N.vtt"
