import React, { memo, useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { apiGetProductsOfBill2 } from '../apis/bill2'
const DetailOrder = () => {
    const { detailOrder } = useSelector(state => state.app)
    const [productsData, setProductsData] = useState([])

    useEffect(() => {
        const fetchProducts = async (bid) => {
            const response = await apiGetProductsOfBill2(bid)
            if (response?.status === 0) setProductsData(response.billData)
        }

        if (detailOrder) fetchProducts(detailOrder.id)

    }, [detailOrder])
    const handleGetTotal = () => {
        let total = 0
        productsData?.forEach(item => {
            total += +item.cost * +item.qty
        })
        return Number(total.toFixed(1)).toLocaleString()
    }
    return (
        <div className='w-full'>
            <div className='flex items-center py-2 border-b border-gray-200'>
                <span className='flex-5'>Sản phẩm</span>
                <span className='flex-1 flex justify-center'>Giá</span>
                <span className='flex-1 flex justify-center'>Số lượng</span>
                <span className='flex-1 flex justify-center'>Tổng</span>
            </div>
            <div className='w-full py-4 flex gap-4 flex-col'>
                {productsData?.map(item => (
                    <div className='flex' key={item.id}>
                        <div className='flex-5 flex gap-4'>
                            <img src={item.products.mainImage} alt="products" className='w-[75px] h-[80px] object-cover border rounded-md' />
                            <span className='flex flex-col'>
                                <span className='font-bold'>{item.products.name}</span>
                                <span>{item.products.description}</span>
                            </span>
                        </div>
                        <span className='flex-1 flex justify-center'>{Number(item.cost.toFixed(1)).toLocaleString()}</span>
                        <span className='flex-1 flex justify-center'>{item.qty}</span>
                        <span className='flex-1 subtotal flex justify-center'>{Number((+item.cost * +item.qty).toFixed(1)).toLocaleString()}</span>
                    </div>
                ))}
            </div>
            <div className='mt-[40px]'>
                <h3 className='text-lg font-bold py-2 border-b border-gray-200'>Thông tin hóa đơn</h3>
                <div className='w-full py-4 flex gap-4'>
                    <div className='flex flex-col font-bold flex-1'>
                        <span className='text-gray-500'>Chi tiết hóa đơn</span>
                        <span className='text-black flex items-center justify-between'>
                            <span>Tổng cộng:</span>
                            <span>{handleGetTotal()}</span>
                        </span>
                        <span className='text-black flex items-center justify-between'>
                            <span>Giảm giá:</span>
                            <span>0</span>
                        </span>
                        <span className='text-black flex items-center justify-between'>
                            <span>Phí ship:</span>
                            <span>Free</span>
                        </span>
                        <span className='text-black flex items-center justify-between'>
                            <span>Giá phải trả:</span>
                            <span>{handleGetTotal()}</span>
                        </span>
                    </div>
                    <div className='flex-1 flex flex-col items-center font-bold'>
                        <span className='text-gray-500'>Hình thức thanh toán</span>
                        <span className='text-black'>Trả tiền mặt</span>
                    </div>
                    <div className='flex-1 flex flex-col font-bold'>
                        <span className='text-gray-500'>Địa chỉ chi tiết</span>
                        <span className='text-black'>{detailOrder?.addressData?.name}</span>
                        <span className='text-black'>{detailOrder?.addressData?.address}</span>
                        <span className='text-black'>{detailOrder?.addressData?.phone}</span>
                    </div>

                </div>
            </div>
        </div>
    )
}

export default memo(DetailOrder)