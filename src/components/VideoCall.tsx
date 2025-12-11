import React, { useRef, useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Video, VideoOff, Phone, PhoneOff, Mic, MicOff } from 'lucide-react';
import { toast } from 'sonner';

interface VideoCallProps {
  isIncoming?: boolean;
  callerId?: string;
  callerName?: string;
  onAccept?: () => void;
  onReject?: () => void;
  onEnd?: () => void;
  isActive?: boolean;
}

const VideoCall: React.FC<VideoCallProps> = ({
  isIncoming = false,
  callerId,
  callerName,
  onAccept,
  onReject,
  onEnd,
  isActive = false
}) => {
  const localVideoRef = useRef<HTMLVideoElement>(null);
  const remoteVideoRef = useRef<HTMLVideoElement>(null);
  const [localStream, setLocalStream] = useState<MediaStream | null>(null);
  const [isVideoEnabled, setIsVideoEnabled] = useState(true);
  const [isAudioEnabled, setIsAudioEnabled] = useState(true);
  const [peerConnection, setPeerConnection] = useState<RTCPeerConnection | null>(null);

  useEffect(() => {
    if (isActive) {
      initializeCall();
    }
    return () => {
      cleanup();
    };
  }, [isActive]);

  const initializeCall = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ 
        video: true, 
        audio: true 
      });
      setLocalStream(stream);
      if (localVideoRef.current) {
        localVideoRef.current.srcObject = stream;
      }

      // Initialize WebRTC peer connection
      const pc = new RTCPeerConnection({
        iceServers: [{ urls: 'stun:stun.l.google.com:19302' }]
      });

      stream.getTracks().forEach(track => {
        pc.addTrack(track, stream);
      });

      pc.ontrack = (event) => {
        if (remoteVideoRef.current) {
          remoteVideoRef.current.srcObject = event.streams[0];
        }
      };

      setPeerConnection(pc);
    } catch (error) {
      console.error('Error accessing media devices:', error);
      toast.error('Could not access camera and microphone');
    }
  };

  const cleanup = () => {
    if (localStream) {
      localStream.getTracks().forEach(track => track.stop());
    }
    if (peerConnection) {
      peerConnection.close();
    }
  };

  const toggleVideo = () => {
    if (localStream) {
      const videoTrack = localStream.getVideoTracks()[0];
      if (videoTrack) {
        videoTrack.enabled = !videoTrack.enabled;
        setIsVideoEnabled(videoTrack.enabled);
      }
    }
  };

  const toggleAudio = () => {
    if (localStream) {
      const audioTrack = localStream.getAudioTracks()[0];
      if (audioTrack) {
        audioTrack.enabled = !audioTrack.enabled;
        setIsAudioEnabled(audioTrack.enabled);
      }
    }
  };

  const handleEndCall = () => {
    cleanup();
    onEnd?.();
  };

  if (isIncoming && !isActive) {
    return (
      <Card className="w-full max-w-md mx-auto">
        <CardHeader>
          <CardTitle className="text-center">Incoming Video Call</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="text-center">
            <p className="text-lg font-medium">{callerName}</p>
            <p className="text-sm text-muted-foreground">wants to video chat</p>
          </div>
          <div className="flex gap-4 justify-center">
            <Button onClick={onAccept} className="bg-green-600 hover:bg-green-700">
              <Video className="w-4 h-4 mr-2" />
              Accept
            </Button>
            <Button onClick={onReject} variant="destructive">
              <PhoneOff className="w-4 h-4 mr-2" />
              Decline
            </Button>
          </div>
        </CardContent>
      </Card>
    );
  }

  if (!isActive) return null;

  return (
    <Card className="w-full h-full">
      <CardContent className="p-0 h-full relative">
        {/* Remote video (main view) */}
        <video
          ref={remoteVideoRef}
          autoPlay
          playsInline
          className="w-full h-full object-cover bg-gray-900"
        />
        
        {/* Local video (picture-in-picture) */}
        <div className="absolute top-4 right-4 w-32 h-24 bg-gray-800 rounded-lg overflow-hidden">
          <video
            ref={localVideoRef}
            autoPlay
            playsInline
            muted
            className="w-full h-full object-cover"
          />
        </div>

        {/* Control buttons */}
        <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex gap-4">
          <Button
            onClick={toggleVideo}
            variant={isVideoEnabled ? "secondary" : "destructive"}
            size="sm"
          >
            {isVideoEnabled ? <Video className="w-4 h-4" /> : <VideoOff className="w-4 h-4" />}
          </Button>
          <Button
            onClick={toggleAudio}
            variant={isAudioEnabled ? "secondary" : "destructive"}
            size="sm"
          >
            {isAudioEnabled ? <Mic className="w-4 h-4" /> : <MicOff className="w-4 h-4" />}
          </Button>
          <Button onClick={handleEndCall} variant="destructive" size="sm">
            <PhoneOff className="w-4 h-4" />
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default VideoCall;