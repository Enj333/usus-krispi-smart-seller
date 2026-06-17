<!DOCTYPE html>
<html>

<head>
    <meta charset="utf-8">
    <title>Laporan Penjualan</title>

    <style>
        body {
            font-family: sans-serif;
        }

        table {
            width: 100%;
            border-collapse: collapse;
            margin-top: 20px;
        }

        th,
        td {
            border: 1px solid #ddd;
            padding: 8px;
        }

        th {
            background: #f3f3f3;
        }
    </style>
</head>

<body>

    <h1>Laporan Penjualan</h1>

    <p>Total Order: {{ $totalOrder }}</p>

    <p>
        Total Pendapatan:
        Rp {{ number_format($totalRevenue,0,',','.') }}
    </p>

    <table>
        <thead>
            <tr>
                <th>No</th>
                <th>Customer</th>
                <th>Phone</th>
                <th>Status</th>
                <th>Total</th>
            </tr>
        </thead>

        <tbody>
            @foreach($orders as $order)
            <tr>
                <td>{{ $loop->iteration }}</td>
                <td>{{ $order->customer_name }}</td>
                <td>{{ $order->phone }}</td>
                <td>{{ $order->status }}</td>
                <td>
                    Rp {{ number_format($order->total_price,0,',','.') }}
                </td>
            </tr>
            @endforeach
        </tbody>
    </table>

</body>

</html>