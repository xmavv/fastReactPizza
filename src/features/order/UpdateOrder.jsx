import { redirect, useActionData, useFetcher } from 'react-router-dom';
import Button from './../../ui/Button';
import { updateOrder } from '../../services/apiRestaurant';
import { isValidPhone } from '../../utils/helpers';

function UpdateOrder({ order }) {
  const fetcher = useFetcher();
  const errors = fetcher.data;

  return (
    <fetcher.Form
      method="PATCH"
      className="space-y-3 border-t-2 border-stone-300 pt-2"
    >
      <h3 className="py-2 text-lg font-bold">
        <span className="border-b-2 border-yellow-400">Change</span> Your data
      </h3>

      <div className="flex items-center">
        <label htmlFor="customer" className="mr-2">
          Name
        </label>
        <div>
          <input
            type="text"
            name="customer"
            className="input rounded border border-stone-500 p-1"
          />
        </div>
      </div>

      <div className="flex items-center">
        <label htmlFor="phone" className="mr-2">
          Phone number
        </label>
        <div className="flex gap-2">
          <input
            type="tel"
            name="phone"
            className="input rounded border border-stone-500 p-1"
          />

          {errors?.phone && (
            <p className="mt-2 rounded-md bg-red-100 p-2 text-xs text-red-700">
              {errors.phone}
            </p>
          )}
        </div>
      </div>
      <div className="flex items-center">
        <label htmlFor="priority" className="mr-2">
          Priority
        </label>
        <input
          type="checkbox"
          name="priority"
          className="h-6 w-6 accent-yellow-400 focus:outline-none focus:ring focus:ring-yellow-400 focus:ring-offset-2"
        />
      </div>
      <div className="inline-block py-2">
        <Button type="primary">Change data</Button>
      </div>
    </fetcher.Form>
  );
}

export default UpdateOrder;

export async function action({ request, params }) {
  const formData = await request.formData();
  const data = Object.fromEntries(formData);

  //validation
  const errors = {};
  if (!isValidPhone(data.phone)) errors.phone = 'Put the correct phone number';
  if (Object.keys(errors).length > 0) return errors;

  const updatedOrder = {
    customer: data.customer, //cannot do this due to api ;(
    priority: data.priority === 'on',
  };

  await updateOrder(params.orderId, updatedOrder);

  redirect(`/order/${params.orderId}?tel=${data.phone}`);
  return null;
}
