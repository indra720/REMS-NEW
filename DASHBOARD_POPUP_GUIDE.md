# Dashboard Popup Design Implementation Guide

## Apply this design to AdminDashboard, OwnerDashboard, and AgentDashboard

### 1. DialogContent Container
```tsx
<DialogContent className="max-w-4xl max-h-[90vh] overflow-hidden flex flex-col p-0">
```

### 2. Header Section
```tsx
<DialogHeader className="px-6 py-4 border-b bg-muted/20 flex-shrink-0">
  <DialogTitle className="text-lg font-semibold flex items-center gap-2">
    <Icon className="h-5 w-5 text-purple-600" />
    Title Here
  </DialogTitle>
</DialogHeader>
```

### 3. Content Section
```tsx
<div className="flex-1 overflow-y-auto px-6 py-4">
  <div className="space-y-4">
    {/* Content here */}
  </div>
</div>
```

### 4. Field Layout (View Mode)
```tsx
<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
  <div className="p-3 border rounded-lg">
    <label className="text-sm font-medium text-muted-foreground">
      Field Label
    </label>
    <p className="font-semibold text-lg break-words">
      {value || "N/A"}
    </p>
  </div>
</div>
```

### 5. Field Layout (Edit Mode)
```tsx
<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
  <div>
    <Label className="text-sm font-medium">Field Label</Label>
    <Input value={value} onChange={handleChange} />
  </div>
</div>
```

### 6. Footer Section
```tsx
<DialogFooter className="px-6 py-4 border-t bg-muted/20 flex-shrink-0">
  <div className="flex gap-3 w-full">
    <Button className="flex-1 bg-purple-600 text-white hover:bg-purple-700">
      <Save className="h-4 w-4 mr-2" />
      Save Changes
    </Button>
    <Button variant="outline" className="flex-1">
      <X className="h-4 w-4 mr-2" />
      Cancel
    </Button>
  </div>
</DialogFooter>
```

### 7. Badge Styling
```tsx
<Badge
  variant={status === "Pending" ? "secondary" : "default"}
  className={`mt-1 ${status !== "Pending" ? "bg-purple-600 text-white" : ""}`}
>
  {status}
</Badge>
```

### 8. DateTime Display
```tsx
<p className="font-medium mt-1">
  {new Date(dateValue).toLocaleDateString()} at{" "}
  {new Date(dateValue).toLocaleTimeString()}
</p>
```

## Key Features:
- ✅ **Responsive Design** - Works on mobile and desktop
- ✅ **Scrollable Content** - Handles long content
- ✅ **Consistent Spacing** - px-6 py-4 pattern
- ✅ **Purple Theme** - bg-purple-600 for primary buttons
- ✅ **Grid Layout** - 1 column mobile, 2 columns desktop
- ✅ **Border Styling** - Subtle borders and backgrounds

## Apply to:
1. **AdminDashboard** - All popup dialogs
2. **OwnerDashboard** - All popup dialogs  
3. **AgentDashboard** - All popup dialogs

Replace existing DialogContent, DialogHeader, and DialogFooter with this design pattern.
