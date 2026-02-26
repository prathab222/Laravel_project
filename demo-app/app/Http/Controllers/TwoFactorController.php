<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Laravel\Fortify\Actions\EnableTwoFactorAuthentication;
use Laravel\Fortify\Actions\DisableTwoFactorAuthentication;

class TwoFactorController extends Controller
{
    public function enable(Request $request, EnableTwoFactorAuthentication $enable)
    {
        $enable($request->user());
        
        return response()->json([
            'qr_code' => $request->user()->twoFactorQrCodeSvg(),
            'recovery_codes' => json_decode(decrypt($request->user()->two_factor_recovery_codes))
        ]);
    }

    public function confirm(Request $request)
    {
        $request->validate(['code' => 'required|string']);

        $user = $request->user();
        
        if (!$user->confirmTwoFactorAuth($request->code)) {
            return response()->json(['message' => 'Invalid code'], 422);
        }

        return response()->json(['message' => '2FA enabled successfully']);
    }

    public function disable(Request $request, DisableTwoFactorAuthentication $disable)
    {
        $disable($request->user());
        
        return response()->json(['message' => '2FA disabled successfully']);
    }

    public function recoveryCodes(Request $request)
    {
        return response()->json([
            'recovery_codes' => json_decode(decrypt($request->user()->two_factor_recovery_codes))
        ]);
    }
}
