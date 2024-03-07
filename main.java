class SegmentTree
{
    int tree[];
    int arr[];
    SegmentTree(int ar[])
    {
    arr=ar;
    tree=new int[4*arr.length];
    build(1,0,arr.length-1);
    }

    private void build(int node,int start,int end)
    {
        if(start==end)
        {
            tree[node] += 1;
        }else
        {
            int mid=(start+end)/2;
            int left=node*2;
            int right=node*2+1;
            build(left,start,mid);
            build(right,mid+1,end);
            tree[node]=tree[left],tree[right]
        }
    }      

    private int query(int node,int start,int end,int l,int r)
    {
        if(end<l||r<start)return Integer.MIN_VALUE;

        if(l<=start&&end<=r) return tree[node];
        else
        {
        int mid=(start+end)/2;
        int left=query(node*2,start,mid,l,r);
        int right=query(node*2+1,mid+1,end,l,r);
        return Math.max(left,right);
        }
    }

    int query(int l,int r)
    {
    return query(1,0,arr.length-1,l,r);
    }
}