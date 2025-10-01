import React from 'react';
import { Button } from '@/components/ui/button';
import { showSuccessToast, showErrorToast, showInfoToast, showWarningToast } from '@/utils/toast';

const ToastDemo = () => {
  return (
    <div className="p-4 space-y-4">
      <h3 className="text-lg font-semibold">Toast Notifications Demo</h3>
      <div className="flex gap-2 flex-wrap">
        <Button 
          onClick={() => showSuccessToast("Property saved successfully!")}
          className="bg-green-600 hover:bg-green-700"
        >
          Success Toast
        </Button>
        
        <Button 
          onClick={() => showErrorToast("Failed to save property. Please try again.")}
          variant="destructive"
        >
          Error Toast
        </Button>
        
        <Button 
          onClick={() => showInfoToast("New properties available in your area!")}
          className="bg-blue-600 hover:bg-blue-700"
        >
          Info Toast
        </Button>
        
        <Button 
          onClick={() => showWarningToast("Please verify your email address.")}
          className="bg-yellow-600 hover:bg-yellow-700"
        >
          Warning Toast
        </Button>
      </div>
    </div>
  );
};

export default ToastDemo;
