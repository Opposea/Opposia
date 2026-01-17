import React, { useState, useEffect } from 'react';
import { Trash2, Check, X, RefreshCw, Clock, Mail, User } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';
import { useIsAdmin } from '@/hooks/useIsAdmin';

interface DeletionRequest {
  id: string;
  user_id: string;
  user_email: string;
  user_name: string;
  status: string;
  requested_at: string;
}

const AdminDeletionRequestsPanel: React.FC = () => {
  const { isAdmin, loading: adminLoading } = useIsAdmin();
  const [requests, setRequests] = useState<DeletionRequest[]>([]);
  const [loading, setLoading] = useState(true);
  const [processing, setProcessing] = useState<string | null>(null);
  const [confirmDialog, setConfirmDialog] = useState<{
    open: boolean;
    requestId: string;
    action: 'approve' | 'reject';
    userName: string;
  }>({ open: false, requestId: '', action: 'approve', userName: '' });

  const fetchRequests = async () => {
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from('deletion_requests')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setRequests(data || []);
    } catch (error) {
      console.error('Error fetching deletion requests:', error);
      toast.error('Failed to load deletion requests');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (isAdmin) {
      fetchRequests();
    }
  }, [isAdmin]);

  const processRequest = async (requestId: string, action: 'approve' | 'reject') => {
    setProcessing(requestId);
    const request = requests.find(r => r.id === requestId);
    
    try {
      if (action === 'approve' && request) {
        // Delete all user data in order (due to foreign key constraints)
        const userId = request.user_id;
        
        await supabase.from('messages').delete().eq('sender_id', userId);
        await supabase.from('matches').delete().or(`user1_id.eq.${userId},user2_id.eq.${userId}`);
        await supabase.from('blocked_users' as any).delete().eq('user_id', userId);
        await supabase.from('blocked_users' as any).delete().eq('blocked_user_id', userId);
        await supabase.from('gifts' as any).delete().or(`sender_id.eq.${userId},receiver_id.eq.${userId}`);
        await supabase.from('quiz_answers').delete().eq('user_id', userId);
        await supabase.from('user_photos').delete().eq('user_id', userId);
        await supabase.from('reports' as any).delete().or(`reporter_id.eq.${userId},reported_user_id.eq.${userId}`);
        await supabase.from('video_calls' as any).delete().or(`caller_id.eq.${userId},receiver_id.eq.${userId}`);
        await supabase.from('profiles').delete().eq('user_id', userId);
        
        // Note: Auth user deletion requires admin API or manual deletion in Supabase dashboard
      }

      // Update the request status
      const { error } = await supabase
        .from('deletion_requests')
        .update({
          status: action === 'approve' ? 'completed' : 'rejected',
          processed_at: new Date().toISOString(),
        })
        .eq('id', requestId);

      if (error) throw error;

      toast.success(
        action === 'approve'
          ? 'User data deleted successfully. Remove auth user manually in Supabase dashboard.'
          : 'Deletion request rejected'
      );
      
      fetchRequests();
    } catch (error) {
      console.error('Error processing deletion request:', error);
      toast.error('Failed to process request');
    } finally {
      setProcessing(null);
      setConfirmDialog({ open: false, requestId: '', action: 'approve', userName: '' });
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'pending':
        return <Badge variant="outline" className="bg-yellow-100 text-yellow-800 border-yellow-300"><Clock className="w-3 h-3 mr-1" /> Pending</Badge>;
      case 'completed':
        return <Badge variant="outline" className="bg-green-100 text-green-800 border-green-300"><Check className="w-3 h-3 mr-1" /> Completed</Badge>;
      case 'rejected':
        return <Badge variant="outline" className="bg-red-100 text-red-800 border-red-300"><X className="w-3 h-3 mr-1" /> Rejected</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  if (adminLoading || !isAdmin) {
    return null;
  }

  return (
    <>
      <Card className="border-red-500/30 bg-gradient-to-br from-red-50/30 to-red-100/30 dark:from-red-950/10 dark:to-red-900/10">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="flex items-center gap-2 text-lg">
                <Trash2 className="w-5 h-5 text-red-600" />
                Deletion Requests
              </CardTitle>
              <CardDescription>
                Review and process user account deletion requests
              </CardDescription>
            </div>
            <Button
              variant="outline"
              size="sm"
              onClick={fetchRequests}
              disabled={loading}
            >
              <RefreshCw className={`w-4 h-4 mr-2 ${loading ? 'animate-spin' : ''}`} />
              Refresh
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          {loading ? (
            <div className="text-center py-8 text-muted-foreground">Loading requests...</div>
          ) : requests.length === 0 ? (
            <div className="text-center py-8 text-muted-foreground">
              No deletion requests found
            </div>
          ) : (
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>User</TableHead>
                    <TableHead>Email</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Requested</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {requests.map((request) => (
                    <TableRow key={request.id}>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <User className="w-4 h-4 text-muted-foreground" />
                          <span className="font-medium">{request.user_name}</span>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <Mail className="w-4 h-4 text-muted-foreground" />
                          <span className="text-sm">{request.user_email}</span>
                        </div>
                      </TableCell>
                      <TableCell>{getStatusBadge(request.status)}</TableCell>
                      <TableCell className="text-sm text-muted-foreground">
                        {new Date(request.requested_at).toLocaleDateString()}
                      </TableCell>
                      <TableCell>
                        {request.status === 'pending' ? (
                          <div className="flex gap-2">
                            <Button
                              size="sm"
                              variant="outline"
                              className="bg-green-50 hover:bg-green-100 text-green-700 border-green-300"
                              onClick={() => setConfirmDialog({
                                open: true,
                                requestId: request.id,
                                action: 'approve',
                                userName: request.user_name
                              })}
                              disabled={processing === request.id}
                            >
                              <Check className="w-4 h-4 mr-1" />
                              Approve
                            </Button>
                            <Button
                              size="sm"
                              variant="outline"
                              className="bg-red-50 hover:bg-red-100 text-red-700 border-red-300"
                              onClick={() => setConfirmDialog({
                                open: true,
                                requestId: request.id,
                                action: 'reject',
                                userName: request.user_name
                              })}
                              disabled={processing === request.id}
                            >
                              <X className="w-4 h-4 mr-1" />
                              Reject
                            </Button>
                          </div>
                        ) : (
                          <span className="text-sm text-muted-foreground">
                            Processed
                          </span>
                        )}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          )}
        </CardContent>
      </Card>

      <AlertDialog open={confirmDialog.open} onOpenChange={(open) => 
        setConfirmDialog(prev => ({ ...prev, open }))
      }>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>
              {confirmDialog.action === 'approve' 
                ? 'Approve Deletion Request?' 
                : 'Reject Deletion Request?'}
            </AlertDialogTitle>
            <AlertDialogDescription>
              {confirmDialog.action === 'approve' 
                ? `This will permanently delete all data for ${confirmDialog.userName}. You'll need to manually delete their auth account in the Supabase dashboard. This action cannot be undone.`
                : `This will reject the deletion request for ${confirmDialog.userName}. They may submit another request.`}
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={() => processRequest(confirmDialog.requestId, confirmDialog.action)}
              className={confirmDialog.action === 'approve' 
                ? 'bg-green-600 hover:bg-green-700' 
                : 'bg-red-600 hover:bg-red-700'}
            >
              {confirmDialog.action === 'approve' ? 'Approve & Delete' : 'Reject Request'}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
};

export default AdminDeletionRequestsPanel;
