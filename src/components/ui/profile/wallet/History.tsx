import React from 'react';

const History = () => {
  return (
    <div className="bg-gray-bg paddingx-68 paddingy-32">
      <table className="table table-borderless bg-transparent">
        <thead>
          <tr>
            <th scope="col text-center">العملية</th>
            <th scope="col">المبلغ</th>
            <th scope="col">التفاصيل</th>
            <th scope="col text-center">التاريخ</th>
          </tr>
        </thead>
        <tbody>
          <tr className="border rounded">
            <td scope="text-gray">إيداع</td>
            <td className="text-gray">500 ج . م</td>
            <td className="text-gray">#Order Number</td>
            <td className="d-flex align-items-center gap-4">
              <p className="text-gray"> 16 يونيو 2023</p>
              <p className="text-gray"> 10:00 ص</p>
            </td>
          </tr>
          <tr className="border rounded">
            <td scope="text-gray">إيداع</td>
            <td className="text-gray">500 ج . م</td>
            <td className="text-gray">#Order Number</td>
            <td className="d-flex align-items-center gap-4">
              <p className="text-gray"> 16 يونيو 2023</p>
              <p className="text-gray"> 10:00 ص</p>
            </td>
          </tr>
          <tr className="border rounded">
            <td scope="text-gray">إيداع</td>
            <td className="text-gray">500 ج . م</td>
            <td className="text-gray">#Order Number</td>
            <td className="d-flex align-items-center gap-4">
              <p className="text-gray"> 16 يونيو 2023</p>
              <p className="text-gray"> 10:00 ص</p>
            </td>
          </tr>
          <tr className="border rounded">
            <td scope="text-gray">إيداع</td>
            <td className="text-gray">500 ج . م</td>
            <td className="text-gray">#Order Number</td>
            <td className="d-flex align-items-center gap-4">
              <p className="text-gray"> 16 يونيو 2023</p>
              <p className="text-gray"> 10:00 ص</p>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default History;
