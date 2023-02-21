import { useEffect, useState } from 'react'
import ApiProduct from '../apis/product'

const DetailProductChatbot = ({ pid }) => {
    const [productData, setProductData] = useState(null)
    useEffect(() => {
        const fetchProduct = async () => {
            const response = await ApiProduct.getProductByIdClient({ id: pid })
            if (response.status === 0) setProductData(response.productData.rows[0])
        }
        fetchProduct()
    }, [pid])
    return (
        <div className='w-[700px] bg-white rounded-md p-4'>
            <h3 className='text-[18px] font-bold'>Chi tiết sản phẩm</h3>

            <span>{productData?.name}</span>
        </div>
    )
}

export default DetailProductChatbot