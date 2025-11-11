export default function Inquiry() {
  return (
    <>
      <div className="flex flex-row ">
        <div className="flex justify-start font-semibold text-2xl">Inquiry List</div>
        <div className="flex justify-end px-34 gap-4">
          <button >My Leads</button>
          <button>filter</button>
          <button>Add</button>
        </div>
      </div>
       <div className="w-1/6 m-5">
        <input type="text" className="border-0.5"></input>
       </div>
       <div>
        <table>
            <thead>
                <th>Name</th>
                <th>Country</th>
                <th>Entry Date</th>
                <th>Categories</th>
                <th>Recent Record</th>
                <th>Actions</th>
            </thead>
            <tbody>
                <tr>
                    <td>test</td>
                    <td>India</td>
                    <td>26-08-2025</td>
                    <td>Leads</td>
                    <td>Not assigned</td>
                </tr>
            </tbody>
        </table>
       </div>
    </>
  );
}
